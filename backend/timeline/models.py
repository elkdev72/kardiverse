from django.db import models

# Create your models here.

class LifePhase(models.Model):
    PHASE_CHOICES = [
        ('Birth & Childhood', 'Birth & Childhood'),
        ('Youth & Learning', 'Youth & Learning'),
        ('Love & Partnership', 'Love & Partnership'),
        ('Service & Achievement', 'Service & Achievement'),
        ('Wisdom & Legacy', 'Wisdom & Legacy'),
    ]
    
    phase = models.CharField(max_length=100, choices=PHASE_CHOICES)
    age_range = models.CharField(max_length=50)  # e.g., "0-12 years"
    icon_name = models.CharField(max_length=50)  # e.g., "Baby", "GraduationCap"
    color_class = models.CharField(max_length=100)  # Tailwind CSS classes
    icon_color_class = models.CharField(max_length=100)  # Tailwind CSS icon color classes
    description = models.TextField()
    milestones = models.JSONField(default=list)  # List of milestone strings
    spiritual_aspect = models.TextField()
    
    # Ordering and metadata
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['order']
        verbose_name = 'Life Phase'
        verbose_name_plural = 'Life Phases'
    
    def __str__(self):
        return f"{self.phase} ({self.age_range})"
    
    def get_milestones_display(self):
        """Return milestones as a formatted string"""
        return ', '.join(self.milestones) if self.milestones else 'No milestones'
    
    def get_icon_component(self):
        """Return the icon component name for React"""
        return self.icon_name
    
    def get_color_classes(self):
        """Return the color classes for styling"""
        return {
            'background': self.color_class,
            'icon': self.icon_color_class
        }

class TimelineStory(models.Model):
    """Individual stories that can be associated with life phases"""
    title = models.CharField(max_length=200)
    content = models.TextField()
    life_phase = models.ForeignKey(LifePhase, on_delete=models.CASCADE, related_name='stories')
    memorial = models.ForeignKey('memorials.Memorial', on_delete=models.CASCADE, related_name='timeline_stories')
    
    # Media fields
    image = models.ImageField(upload_to='timeline_stories/', null=True, blank=True)
    audio_file = models.FileField(upload_to='timeline_audio/', null=True, blank=True)
    video_file = models.FileField(upload_to='timeline_video/', null=True, blank=True)
    
    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_featured = models.BooleanField(default=False)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Timeline Story'
        verbose_name_plural = 'Timeline Stories'
    
    def __str__(self):
        return f"{self.title} - {self.memorial.name}"
