from django.contrib import admin
from .models import WakeRoomExperience, WakeRoomSession, WakeRoomFeature

@admin.register(WakeRoomExperience)
class WakeRoomExperienceAdmin(admin.ModelAdmin):
    """Admin configuration for WakeRoomExperience model"""
    
    list_display = [
        'title', 'experience_type', 'status', 'duration_minutes', 
        'is_featured', 'created_at'
    ]
    
    list_filter = [
        'experience_type', 'status', 'is_immersive', 'requires_headset',
        'spatial_audio', 'is_featured', 'created_at', 'updated_at'
    ]
    
    search_fields = [
        'title', 'description'
    ]
    
    list_editable = ['status', 'is_featured']
    
    readonly_fields = [
        'created_at', 'updated_at', 'qr_code_data'
    ]
    
    fieldsets = (
        ('Experience Information', {
            'fields': ('title', 'description', 'experience_type', 'status')
        }),
        ('Media Files', {
            'fields': ('demo_video', 'thumbnail_image', 'ar_model_file', 'vr_scene_file')
        }),
        ('Interactive Elements', {
            'fields': ('qr_code_required', 'qr_code_data', 'nfc_enabled', 'nfc_data')
        }),
        ('Experience Settings', {
            'fields': ('duration_minutes', 'is_immersive', 'requires_headset', 'spatial_audio')
        }),
        ('Associations', {
            'fields': ('associated_memorials', 'created_by')
        }),
        ('Status', {
            'fields': ('is_featured',)
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at')
        }),
    )
    
    filter_horizontal = ['associated_memorials']
    
    ordering = ['-created_at']
    
    list_per_page = 25
    
    actions = ['activate_experiences', 'deactivate_experiences', 'mark_featured', 'unmark_featured']
    
    def activate_experiences(self, request, queryset):
        """Activate selected experiences"""
        updated = queryset.update(status='active')
        self.message_user(
            request, 
            f'{updated} experience(s) were successfully activated.'
        )
    activate_experiences.short_description = "Activate selected experiences"
    
    def deactivate_experiences(self, request, queryset):
        """Deactivate selected experiences"""
        updated = queryset.update(status='draft')
        self.message_user(
            request, 
            f'{updated} experience(s) were successfully deactivated.'
        )
    deactivate_experiences.short_description = "Deactivate selected experiences"
    
    def mark_featured(self, request, queryset):
        """Mark selected experiences as featured"""
        updated = queryset.update(is_featured=True)
        self.message_user(
            request, 
            f'{updated} experience(s) were successfully marked as featured.'
        )
    mark_featured.short_description = "Mark selected experiences as featured"
    
    def unmark_featured(self, request, queryset):
        """Unmark selected experiences as featured"""
        updated = queryset.update(is_featured=False)
        self.message_user(
            request, 
            f'{updated} experience(s) were successfully unmarked as featured.'
        )
    unmark_featured.short_description = "Unmark selected experiences as featured"
    
    def get_queryset(self, request):
        """Custom queryset with optimized queries"""
        return super().get_queryset(request).select_related('created_by')
    
    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        """Filter memorials to only show active ones"""
        if db_field.name == "associated_memorials":
            kwargs["queryset"] = db_field.related_model.objects.filter(is_active=True)
        return super().formfield_for_foreignkey(db_field, request, **kwargs)

@admin.register(WakeRoomSession)
class WakeRoomSessionAdmin(admin.ModelAdmin):
    """Admin configuration for WakeRoomSession model"""
    
    list_display = [
        'id', 'user', 'experience', 'memorial', 'start_time', 
        'duration_seconds', 'rating', 'is_active'
    ]
    
    list_filter = [
        'device_type', 'rating', 'start_time', 'end_time'
    ]
    
    search_fields = [
        'user__username', 'experience__title', 'memorial__name'
    ]
    
    readonly_fields = [
        'id', 'start_time'
    ]
    
    fieldsets = (
        ('Session Information', {
            'fields': ('user', 'experience', 'memorial')
        }),
        ('Session Data', {
            'fields': ('start_time', 'end_time', 'duration_seconds')
        }),
        ('User Interaction', {
            'fields': ('interactions_count', 'completed_milestones', 'user_feedback', 'rating')
        }),
        ('Technical Data', {
            'fields': ('device_type', 'browser_info', 'ip_address')
        }),
    )
    
    filter_horizontal = []
    
    ordering = ['-start_time']
    
    list_per_page = 25
    
    actions = ['end_sessions', 'calculate_durations']
    
    def end_sessions(self, request, queryset):
        """End selected active sessions"""
        active_sessions = queryset.filter(end_time__isnull=True)
        updated = 0
        for session in active_sessions:
            session.end_session()
            updated += 1
        
        self.message_user(
            request, 
            f'{updated} session(s) were successfully ended.'
        )
    end_sessions.short_description = "End selected active sessions"
    
    def calculate_durations(self, request, queryset):
        """Recalculate durations for selected sessions"""
        updated = 0
        for session in queryset:
            if session.end_time:
                session.end_session()  # This will recalculate duration
                updated += 1
        
        self.message_user(
            request, 
            f'Duration recalculated for {updated} session(s).'
        )
    calculate_durations.short_description = "Recalculate durations for selected sessions"
    
    def get_queryset(self, request):
        """Custom queryset with optimized queries"""
        return super().get_queryset(request).select_related('user', 'experience', 'memorial')
    
    def has_add_permission(self, request):
        """Disable manual creation of sessions"""
        return False
    
    def has_delete_permission(self, request, obj=None):
        """Disable deletion of sessions"""
        return False

@admin.register(WakeRoomFeature)
class WakeRoomFeatureAdmin(admin.ModelAdmin):
    """Admin configuration for WakeRoomFeature model"""
    
    list_display = [
        'name', 'feature_type', 'is_active'
    ]
    
    list_filter = [
        'feature_type', 'is_active'
    ]
    
    search_fields = [
        'name', 'description'
    ]
    
    list_editable = ['is_active', 'feature_type']
    
    readonly_fields = []
    
    fieldsets = (
        ('Feature Information', {
            'fields': ('name', 'description', 'icon_name')
        }),
        ('Classification', {
            'fields': ('feature_type', 'is_active')
        }),
        ('Technical Details', {
            'fields': ('technical_requirements',)
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
