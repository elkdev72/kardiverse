from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator
import uuid

class LegacyLicense(models.Model):
    LICENSE_TYPES = [
        ('FOMO_250', 'FOMO 250 Limited Edition'),
        ('STANDARD', 'Standard License'),
        ('PREMIUM', 'Premium License'),
    ]
    
    STATUS_CHOICES = [
        ('available', 'Available'),
        ('reserved', 'Reserved'),
        ('sold', 'Sold'),
        ('expired', 'Expired'),
    ]
    
    # License identification
    license_id = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    license_number = models.PositiveIntegerField(unique=True, validators=[MinValueValidator(1), MaxValueValidator(250)])
    license_type = models.CharField(max_length=20, choices=LICENSE_TYPES, default='FOMO_250')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='available')
    
    # Pricing and availability
    original_price = models.DecimalField(max_digits=10, decimal_places=2, default=2999.00)
    current_price = models.DecimalField(max_digits=10, decimal_places=2, default=1999.00)
    is_discounted = models.BooleanField(default=True)
    discount_percentage = models.PositiveIntegerField(default=33, validators=[MaxValueValidator(100)])
    
    # Features and benefits
    features = models.JSONField(default=list)  # List of feature strings
    storage_limit_gb = models.PositiveIntegerField(default=1000)  # Storage in GB
    family_members_limit = models.PositiveIntegerField(default=100)
    lifetime_guarantee = models.BooleanField(default=True)
    
    # Purchase information
    purchaser = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='purchased_licenses')
    purchase_date = models.DateTimeField(null=True, blank=True)
    payment_method = models.CharField(max_length=50, blank=True)
    transaction_id = models.CharField(max_length=100, blank=True)
    
    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    expires_at = models.DateTimeField(null=True, blank=True)  # For non-lifetime licenses
    
    class Meta:
        ordering = ['license_number']
        verbose_name = 'Legacy License'
        verbose_name_plural = 'Legacy Licenses'
    
    def __str__(self):
        return f"License #{self.license_number} - {self.get_license_type_display()}"
    
    def save(self, *args, **kwargs):
        # Auto-calculate discount percentage
        if self.original_price and self.current_price:
            discount = ((self.original_price - self.current_price) / self.original_price) * 100
            self.discount_percentage = round(discount)
            self.is_discounted = self.current_price < self.original_price
        
        super().save(*args, **kwargs)
    
    def is_available(self):
        """Check if license is available for purchase"""
        return self.status == 'available'
    
    def reserve_license(self, user):
        """Reserve a license for a user"""
        if self.is_available():
            self.status = 'reserved'
            self.purchaser = user
            self.save()
            return True
        return False
    
    def purchase_license(self, user, payment_method, transaction_id):
        """Complete the purchase of a license"""
        if self.status in ['available', 'reserved']:
            self.status = 'sold'
            self.purchaser = user
            self.purchase_date = models.timezone.now()
            self.payment_method = payment_method
            self.transaction_id = transaction_id
            self.save()
            return True
        return False
    
    def get_price_display(self):
        """Return formatted price display"""
        if self.is_discounted:
            return f"${self.current_price} (${self.original_price})"
        return f"${self.current_price}"
    
    def get_features_display(self):
        """Return features as a formatted string"""
        return ', '.join(self.features) if self.features else 'No features listed'
    
    def get_remaining_licenses(self):
        """Get count of remaining available licenses"""
        return LegacyLicense.objects.filter(status='available').count()

class LicenseFeature(models.Model):
    """Individual features that can be associated with licenses"""
    name = models.CharField(max_length=100)
    description = models.TextField()
    icon_name = models.CharField(max_length=50)  # e.g., "Shield", "Star"
    is_active = models.BooleanField(default=True)
    
    # Feature categories
    category = models.CharField(max_length=50, blank=True)  # e.g., "Storage", "Security", "Access"
    
    class Meta:
        ordering = ['name']
        verbose_name = 'License Feature'
        verbose_name_plural = 'License Features'
    
    def __str__(self):
        return self.name
    
    def get_icon_component(self):
        """Return the icon component name for React"""
        return self.icon_name

class LicensePurchase(models.Model):
    """Track license purchase history"""
    license = models.ForeignKey(LegacyLicense, on_delete=models.CASCADE, related_name='purchase_history')
    purchaser = models.ForeignKey(User, on_delete=models.CASCADE, related_name='license_purchases')
    purchase_date = models.DateTimeField(auto_now_add=True)
    amount_paid = models.DecimalField(max_digits=10, decimal_places=2)
    payment_method = models.CharField(max_length=50)
    transaction_id = models.CharField(max_length=100)
    status = models.CharField(max_length=20, default='completed')
    
    class Meta:
        ordering = ['-purchase_date']
        verbose_name = 'License Purchase'
        verbose_name_plural = 'License Purchases'
    
    def __str__(self):
        return f"{self.purchaser.username} - {self.license} - {self.purchase_date}"
