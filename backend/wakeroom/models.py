from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator
from memorials.models import Memorial

# Create your models here.

class WakeRoomExperience(models.Model):
    EXPERIENCE_TYPES = [
        ('AR', 'Augmented Reality'),
        ('VR', 'Virtual Reality'),
        ('360', '360° Video'),
        ('INTERACTIVE', 'Interactive Demo'),
        ('AUDIO', 'Spatial Audio'),
    ]
    
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('active', 'Active'),
        ('maintenance', 'Maintenance'),
        ('archived', 'Archived'),
    ]
    
    title = models.CharField(max_length=200)
    description = models.TextField()
    experience_type = models.CharField(max_length=20, choices=EXPERIENCE_TYPES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')
    
    # Media content
    demo_video = models.FileField(upload_to='wakeroom/demos/', null=True, blank=True)
    thumbnail_image = models.ImageField(upload_to='wakeroom/thumbnails/', null=True, blank=True)
    ar_model_file = models.FileField(upload_to='wakeroom/ar_models/', null=True, blank=True)  # 3D models
    vr_scene_file = models.FileField(upload_to='wakeroom/vr_scenes/', null=True, blank=True)
    
    # Interactive elements
    qr_code_required = models.BooleanField(default=True)
    qr_code_data = models.CharField(max_length=500, blank=True)
    nfc_enabled = models.BooleanField(default=False)
    nfc_data = models.CharField(max_length=500, blank=True)
    
    # Experience settings
    duration_minutes = models.PositiveIntegerField(default=5)
    is_immersive = models.BooleanField(default=True)
    requires_headset = models.BooleanField(default=False)
    spatial_audio = models.BooleanField(default=True)
    
    # Associated memorials
    associated_memorials = models.ManyToManyField(Memorial, blank=True, related_name='wakeroom_experiences')
    
    # Metadata
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_featured = models.BooleanField(default=False)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'WakeRoom Experience'
        verbose_name_plural = 'WakeRoom Experiences'
    
    def __str__(self):
        return f"{self.title} ({self.get_experience_type_display()})"
    
    def save(self, *args, **kwargs):
        # Generate QR code data if not provided
        if self.qr_code_required and not self.qr_code_data:
            self.qr_code_data = f"/wakeroom/experience/{self.id}"
        
        super().save(*args, **kwargs)
    
    def get_media_files(self):
        """Return list of available media files"""
        media_files = []
        if self.demo_video:
            media_files.append(('video', self.demo_video))
        if self.thumbnail_image:
            media_files.append(('image', self.thumbnail_image))
        if self.ar_model_file:
            media_files.append(('ar_model', self.ar_model_file))
        if self.vr_scene_file:
            media_files.append(('vr_scene', self.vr_scene_file))
        return media_files
    
    def get_experience_duration(self):
        """Return formatted duration"""
        if self.duration_minutes < 60:
            return f"{self.duration_minutes} minutes"
        else:
            hours = self.duration_minutes // 60
            minutes = self.duration_minutes % 60
            if minutes == 0:
                return f"{hours} hour{'s' if hours > 1 else ''}"
            else:
                return f"{hours}h {minutes}m"
    
    def is_available(self):
        """Check if experience is available for use"""
        return self.status == 'active'
    
    def get_technology_requirements(self):
        """Return list of technology requirements"""
        requirements = []
        if self.requires_headset:
            requirements.append('VR Headset')
        if self.spatial_audio:
            requirements.append('Spatial Audio Headphones')
        if self.nfc_enabled:
            requirements.append('NFC-enabled Device')
        if self.qr_code_required:
            requirements.append('QR Code Scanner')
        return requirements

class WakeRoomSession(models.Model):
    """Track user sessions in WakeRoom experiences"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='wakeroom_sessions')
    experience = models.ForeignKey(WakeRoomExperience, on_delete=models.CASCADE, related_name='sessions')
    memorial = models.ForeignKey(Memorial, on_delete=models.CASCADE, null=True, blank=True, related_name='wakeroom_sessions')
    
    # Session data
    start_time = models.DateTimeField(auto_now_add=True)
    end_time = models.DateTimeField(null=True, blank=True)
    duration_seconds = models.PositiveIntegerField(null=True, blank=True)
    
    # User interaction data
    interactions_count = models.PositiveIntegerField(default=0)
    completed_milestones = models.JSONField(default=list, blank=True)
    user_feedback = models.TextField(blank=True)
    rating = models.PositiveIntegerField(null=True, blank=True, validators=[MinValueValidator(1), MaxValueValidator(5)])
    
    # Technical data
    device_type = models.CharField(max_length=50, blank=True)  # mobile, desktop, vr_headset
    browser_info = models.CharField(max_length=200, blank=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    
    class Meta:
        ordering = ['-start_time']
        verbose_name = 'WakeRoom Session'
        verbose_name_plural = 'WakeRoom Sessions'
    
    def __str__(self):
        return f"{self.user.username} - {self.experience.title} - {self.start_time}"
    
    def end_session(self):
        """End the session and calculate duration"""
        if not self.end_time:
            self.end_time = models.timezone.now()
            duration = (self.end_time - self.start_time).total_seconds()
            self.duration_seconds = int(duration)
            self.save()
    
    def get_duration_display(self):
        """Return formatted duration"""
        if self.duration_seconds:
            minutes = self.duration_seconds // 60
            seconds = self.duration_seconds % 60
            return f"{minutes}m {seconds}s"
        return "Active"
    
    def is_active(self):
        """Check if session is currently active"""
        return self.end_time is None

class WakeRoomFeature(models.Model):
    """Features and capabilities of the WakeRoom system"""
    name = models.CharField(max_length=100)
    description = models.TextField()
    icon_name = models.CharField(max_length=50)  # e.g., "Eye", "Headphones"
    is_active = models.BooleanField(default=True)
    
    # Feature details
    feature_type = models.CharField(max_length=50, blank=True)  # e.g., "Technology", "Experience", "Access"
    technical_requirements = models.JSONField(default=list, blank=True)
    
    class Meta:
        ordering = ['name']
        verbose_name = 'WakeRoom Feature'
        verbose_name_plural = 'WakeRoom Features'
    
    def __str__(self):
        return self.name
    
    def get_icon_component(self):
        """Return the icon component name for React"""
        return self.icon_name
