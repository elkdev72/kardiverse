from django.db import models
from django.utils import timezone
from PIL import Image
import os

class Memorial(models.Model):
    RELIGION_CHOICES = [
        ('Christian', 'Christian'),
        ('Muslim', 'Muslim'),
    ]
    
    CATEGORY_CHOICES = [
        ('Life Moments', 'Life Moments'),
        ('Voice & Stories', 'Voice & Stories'),
        ('Family Tree', 'Family Tree'),
        ('Spiritual Room', 'Spiritual Room'),
    ]
    
    name = models.CharField(max_length=200)
    dates = models.CharField(max_length=50)  # e.g., "1934 - 2024"
    birth_date = models.DateField(null=True, blank=True)
    death_date = models.DateField(null=True, blank=True)
    image = models.ImageField(upload_to='memorials/', null=True, blank=True)
    religion = models.CharField(max_length=20, choices=RELIGION_CHOICES)
    categories = models.JSONField(default=list)  # Store as list of category strings
    description = models.TextField()
    qr_code = models.BooleanField(default=True)
    qr_code_data = models.CharField(max_length=500, blank=True)  # URL or data for QR code
    
    # Additional fields for enhanced functionality
    family_members = models.JSONField(default=list, blank=True)  # List of family member names
    life_story = models.TextField(blank=True)
    favorite_quotes = models.JSONField(default=list, blank=True)
    achievements = models.JSONField(default=list, blank=True)
    
    # Metadata
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    
    # Language support
    language = models.CharField(max_length=10, default='en')  # en, sw (Swahili)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Memorial'
        verbose_name_plural = 'Memorials'
    
    def __str__(self):
        return f"{self.name} ({self.dates})"
    
    def save(self, *args, **kwargs):
        # Generate QR code data if not provided
        if self.qr_code and not self.qr_code_data:
            self.qr_code_data = f"/memorial/{self.id}"
        
        # Resize image if it's too large
        if self.image:
            super().save(*args, **kwargs)
            self.resize_image()
        else:
            super().save(*args, **kwargs)
    
    def resize_image(self):
        """Resize image to reasonable dimensions for web display"""
        if self.image:
            img_path = self.image.path
            if os.path.exists(img_path):
                with Image.open(img_path) as img:
                    # Convert to RGB if necessary
                    if img.mode != 'RGB':
                        img = img.convert('RGB')
                    
                    # Resize if too large (max 800x600)
                    if img.width > 800 or img.height > 600:
                        img.thumbnail((800, 600), Image.Resampling.LANCZOS)
                        img.save(img_path, quality=85, optimize=True)
    
    def get_absolute_url(self):
        return f"/memorial/{self.id}"
    
    def get_categories_display(self):
        """Return categories as a formatted string"""
        return ', '.join(self.categories) if self.categories else 'No categories'
    
    def get_religion_icon(self):
        """Return the appropriate icon class for the religion"""
        return 'Cross' if self.religion == 'Christian' else 'Moon'
    
    def get_religion_color_class(self):
        """Return Tailwind CSS color classes for the religion"""
        if self.religion == 'Christian':
            return 'bg-divine-gold/20 text-eternal-bronze border-divine-gold/30'
        else:
            return 'bg-heavenly-blue/20 text-primary border-heavenly-blue/30'
