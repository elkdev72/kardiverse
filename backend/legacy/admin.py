from django.contrib import admin
from .models import LegacyLicense, LicenseFeature, LicensePurchase

@admin.register(LegacyLicense)
class LegacyLicenseAdmin(admin.ModelAdmin):
    """Admin configuration for LegacyLicense model"""
    
    list_display = [
        'license_number', 'license_type', 'status', 'current_price', 
        'is_discounted', 'purchaser', 'created_at'
    ]
    
    list_filter = [
        'license_type', 'status', 'is_discounted', 'lifetime_guarantee',
        'created_at', 'purchase_date'
    ]
    
    search_fields = [
        'license_id', 'license_number', 'purchaser__username'
    ]
    
    list_editable = ['status', 'current_price']
    
    readonly_fields = [
        'license_id', 'discount_percentage', 'created_at', 'updated_at'
    ]
    
    fieldsets = (
        ('License Information', {
            'fields': ('license_number', 'license_type', 'status')
        }),
        ('Pricing', {
            'fields': ('original_price', 'current_price', 'is_discounted', 'discount_percentage')
        }),
        ('Features & Benefits', {
            'fields': ('features', 'storage_limit_gb', 'family_members_limit', 'lifetime_guarantee')
        }),
        ('Purchase Information', {
            'fields': ('purchaser', 'purchase_date', 'payment_method', 'transaction_id')
        }),
        ('Metadata', {
            'fields': ('license_id', 'created_at', 'updated_at', 'expires_at')
        }),
    )
    
    filter_horizontal = []
    
    ordering = ['license_number']
    
    list_per_page = 25
    
    actions = ['mark_available', 'mark_reserved', 'mark_sold', 'apply_discount']
    
    def mark_available(self, request, queryset):
        """Mark selected licenses as available"""
        updated = queryset.update(status='available', purchaser=None, purchase_date=None)
        self.message_user(
            request, 
            f'{updated} license(s) were successfully marked as available.'
        )
    mark_available.short_description = "Mark selected licenses as available"
    
    def mark_reserved(self, request, queryset):
        """Mark selected licenses as reserved"""
        updated = queryset.update(status='reserved')
        self.message_user(
            request, 
            f'{updated} license(s) were successfully marked as reserved.'
        )
    mark_reserved.short_description = "Mark selected licenses as reserved"
    
    def mark_sold(self, request, queryset):
        """Mark selected licenses as sold"""
        updated = queryset.update(status='sold')
        self.message_user(
            request, 
            f'{updated} license(s) were successfully marked as sold.'
        )
    mark_sold.short_description = "Mark selected licenses as sold"
    
    def apply_discount(self, request, queryset):
        """Apply discount to selected licenses"""
        discount_percentage = request.POST.get('discount_percentage', 33)
        try:
            discount_percentage = int(discount_percentage)
            updated = 0
            for license_obj in queryset:
                if license_obj.original_price:
                    new_price = license_obj.original_price * (1 - discount_percentage / 100)
                    license_obj.current_price = round(new_price, 2)
                    license_obj.save()
                    updated += 1
            
            self.message_user(
                request, 
                f'Discount applied to {updated} license(s).'
            )
        except ValueError:
            self.message_user(
                request, 
                'Invalid discount percentage. Please enter a valid number.',
                level='ERROR'
            )
    apply_discount.short_description = "Apply discount to selected licenses"
    
    def get_queryset(self, request):
        """Custom queryset with optimized queries"""
        return super().get_queryset(request).select_related('purchaser')
    
    def get_readonly_fields(self, request, obj=None):
        """Make certain fields readonly based on license status"""
        readonly_fields = list(super().get_readonly_fields(request, obj))
        if obj and obj.status == 'sold':
            readonly_fields.extend(['status', 'purchaser', 'purchase_date'])
        return readonly_fields

@admin.register(LicenseFeature)
class LicenseFeatureAdmin(admin.ModelAdmin):
    """Admin configuration for LicenseFeature model"""
    
    list_display = [
        'name', 'category', 'is_active'
    ]
    
    list_filter = [
        'category', 'is_active'
    ]
    
    search_fields = [
        'name', 'description'
    ]
    
    list_editable = ['is_active', 'category']
    
    readonly_fields = []
    
    fieldsets = (
        ('Feature Information', {
            'fields': ('name', 'description', 'icon_name')
        }),
        ('Classification', {
            'fields': ('category', 'is_active')
        }),
    )
    
    ordering = ['name']
    
    list_per_page = 20
    
    actions = ['activate_features', 'deactivate_features']
    
    def activate_features(self, request, queryset):
        """Activate selected features"""
        updated = queryset.update(is_active=True)
        self.message_user(
            request, 
            f'{updated} feature(s) were successfully activated.'
        )
    activate_features.short_description = "Activate selected features"
    
    def deactivate_features(self, request, queryset):
        """Deactivate selected features"""
        updated = queryset.update(is_active=False)
        self.message_user(
            request, 
            f'{updated} feature(s) were successfully deactivated.'
        )
    deactivate_features.short_description = "Deactivate selected features"

@admin.register(LicensePurchase)
class LicensePurchaseAdmin(admin.ModelAdmin):
    """Admin configuration for LicensePurchase model"""
    
    list_display = [
        'id', 'license', 'purchaser', 'amount_paid', 
        'payment_method', 'status', 'purchase_date'
    ]
    
    list_filter = [
        'status', 'payment_method', 'purchase_date'
    ]
    
    search_fields = [
        'transaction_id', 'purchaser__username', 'license__license_number'
    ]
    
    readonly_fields = [
        'id', 'purchase_date'
    ]
    
    fieldsets = (
        ('Purchase Information', {
            'fields': ('license', 'purchaser', 'amount_paid')
        }),
        ('Payment Details', {
            'fields': ('payment_method', 'transaction_id', 'status')
        }),
        ('Metadata', {
            'fields': ('id', 'purchase_date')
        }),
    )
    
    filter_horizontal = []
    
    ordering = ['-purchase_date']
    
    list_per_page = 25
    
    def get_queryset(self, request):
        """Custom queryset with optimized queries"""
        return super().get_queryset(request).select_related('license', 'purchaser')
    
    def has_add_permission(self, request):
        """Disable manual creation of purchases"""
        return False
    
    def has_delete_permission(self, request, obj=None):
        """Disable deletion of purchases"""
        return False
