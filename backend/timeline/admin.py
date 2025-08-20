from django.contrib import admin
from .models import LifePhase, TimelineStory

@admin.register(LifePhase)
class LifePhaseAdmin(admin.ModelAdmin):
    """Admin configuration for LifePhase model"""
    
    list_display = [
        'phase', 'age_range', 'order', 'is_active', 'created_at'
    ]
    
    list_filter = [
        'is_active', 'order', 'created_at', 'updated_at'
    ]
    
    search_fields = [
        'phase', 'description', 'spiritual_aspect'
    ]
    
    list_editable = ['order', 'is_active']
    
    readonly_fields = [
        'created_at', 'updated_at'
    ]
    
    fieldsets = (
        ('Phase Information', {
            'fields': ('phase', 'age_range', 'order', 'is_active')
        }),
        ('Content', {
            'fields': ('description', 'spiritual_aspect', 'milestones')
        }),
        ('Styling', {
            'fields': ('icon_name', 'color_class', 'icon_color_class')
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at')
        }),
    )
    
    ordering = ['order']
    
    list_per_page = 20
    
    actions = ['activate_phases', 'deactivate_phases']
    
    def activate_phases(self, request, queryset):
        """Activate selected life phases"""
        updated = queryset.update(is_active=True)
        self.message_user(
            request, 
            f'{updated} life phase(s) were successfully activated.'
        )
    activate_phases.short_description = "Activate selected life phases"
    
    def deactivate_phases(self, request, queryset):
        """Deactivate selected life phases"""
        updated = queryset.update(is_active=False)
        self.message_user(
            request, 
            f'{updated} life phase(s) were successfully deactivated.'
        )
    deactivate_phases.short_description = "Deactivate selected life phases"

@admin.register(TimelineStory)
class TimelineStoryAdmin(admin.ModelAdmin):
    """Admin configuration for TimelineStory model"""
    
    list_display = [
        'title', 'memorial', 'life_phase', 'is_featured', 
        'created_at', 'updated_at'
    ]
    
    list_filter = [
        'life_phase', 'is_featured', 'created_at', 'updated_at'
    ]
    
    search_fields = [
        'title', 'content', 'memorial__name', 'life_phase__phase'
    ]
    
    list_editable = ['is_featured']
    
    readonly_fields = [
        'created_at', 'updated_at'
    ]
    
    fieldsets = (
        ('Story Information', {
            'fields': ('title', 'content', 'life_phase', 'memorial')
        }),
        ('Media Files', {
            'fields': ('image', 'audio_file', 'video_file')
        }),
        ('Status', {
            'fields': ('is_featured',)
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at')
        }),
    )
    
    filter_horizontal = []
    
    ordering = ['-created_at']
    
    list_per_page = 25
    
    actions = ['feature_stories', 'unfeature_stories']
    
    def feature_stories(self, request, queryset):
        """Mark selected stories as featured"""
        updated = queryset.update(is_featured=True)
        self.message_user(
            request, 
            f'{updated} story(ies) were successfully marked as featured.'
        )
    feature_stories.short_description = "Mark selected stories as featured"
    
    def unfeature_stories(self, request, queryset):
        """Unmark selected stories as featured"""
        updated = queryset.update(is_featured=False)
        self.message_user(
            request, 
            f'{updated} story(ies) were successfully unmarked as featured.'
        )
    unfeature_stories.short_description = "Unmark selected stories as featured"
    
    def get_queryset(self, request):
        """Custom queryset with optimized queries"""
        return super().get_queryset(request).select_related('memorial', 'life_phase')
    
    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        """Filter memorials to only show active ones"""
        if db_field.name == "memorial":
            kwargs["queryset"] = db_field.related_model.objects.filter(is_active=True)
        return super().formfield_for_foreignkey(db_field, request, **kwargs)
