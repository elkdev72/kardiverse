from django.contrib import admin
from .models import Memorial

@admin.register(Memorial)
class MemorialAdmin(admin.ModelAdmin):
    """Admin configuration for Memorial model"""
    
    list_display = [
        'name', 'religion', 'dates', 'language', 'qr_code', 
        'is_active', 'created_at'
    ]
    
    list_filter = [
        'religion', 'language', 'qr_code', 'is_active', 
        'created_at', 'updated_at'
    ]
    
    search_fields = [
        'name', 'description', 'life_story', 'family_members'
    ]
    
    list_editable = ['is_active', 'qr_code']
    
    readonly_fields = [
        'created_at', 'updated_at', 'qr_code_data'
    ]
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'dates', 'birth_date', 'death_date', 'description')
        }),
        ('Religious & Cultural', {
            'fields': ('religion', 'language', 'life_story', 'favorite_quotes')
        }),
        ('Categories & Family', {
            'fields': ('categories', 'family_members', 'achievements')
        }),
        ('Media & Technology', {
            'fields': ('image', 'qr_code', 'qr_code_data')
        }),
        ('Status & Metadata', {
            'fields': ('is_active', 'created_at', 'updated_at')
        }),
    )
    
    filter_horizontal = []
    
    ordering = ['-created_at']
    
    list_per_page = 25
    
    actions = ['activate_memorials', 'deactivate_memorials', 'generate_qr_codes']
    
    def activate_memorials(self, request, queryset):
        """Activate selected memorials"""
        updated = queryset.update(is_active=True)
        self.message_user(
            request, 
            f'{updated} memorial(s) were successfully activated.'
        )
    activate_memorials.short_description = "Activate selected memorials"
    
    def deactivate_memorials(self, request, queryset):
        """Deactivate selected memorials"""
        updated = queryset.update(is_active=False)
        self.message_user(
            request, 
            f'{updated} memorial(s) were successfully deactivated.'
        )
    deactivate_memorials.short_description = "Deactivate selected memorials"
    
    def generate_qr_codes(self, request, queryset):
        """Generate QR codes for selected memorials"""
        updated = 0
        for memorial in queryset:
            if not memorial.qr_code_data:
                memorial.save()  # This will trigger QR code generation
                updated += 1
        
        self.message_user(
            request, 
            f'QR codes generated for {updated} memorial(s).'
        )
    generate_qr_codes.short_description = "Generate QR codes for selected memorials"
    
    def get_queryset(self, request):
        """Custom queryset with optimized queries"""
        return super().get_queryset(request).select_related()
    
    def get_list_display(self, request):
        """Customize list display based on user permissions"""
        list_display = list(super().get_list_display(request))
        if not request.user.is_superuser:
            list_display.remove('created_at')
        return list_display
