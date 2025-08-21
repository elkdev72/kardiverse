from rest_framework import serializers
from .models import LegacyLicense, LicenseFeature, LicensePurchase

class LicenseFeatureSerializer(serializers.ModelSerializer):
    """Serializer for LicenseFeature model"""
    icon_component = serializers.CharField(read_only=True)
    
    class Meta:
        model = LicenseFeature
        fields = [
            'id', 'name', 'description', 'icon_name', 'icon_component',
            'is_active', 'category'
        ]
        read_only_fields = ['id']
    
    def to_representation(self, instance):
        """Custom representation with computed fields"""
        data = super().to_representation(instance)
        data['icon_component'] = instance.get_icon_component()
        return data

class LegacyLicenseSerializer(serializers.ModelSerializer):
    """Serializer for LegacyLicense model"""
    features_display = serializers.CharField(read_only=True)
    price_display = serializers.CharField(read_only=True)
    purchaser_name = serializers.CharField(source='purchaser.username', read_only=True)
    is_available = serializers.BooleanField(read_only=True)
    remaining_licenses = serializers.SerializerMethodField()
    
    class Meta:
        model = LegacyLicense
        fields = [
            'id', 'license_id', 'license_number', 'license_type', 'status',
            'original_price', 'current_price', 'is_discounted', 'discount_percentage',
            'price_display', 'features', 'features_display', 'storage_limit_gb',
            'family_members_limit', 'lifetime_guarantee', 'purchaser', 'purchaser_name',
            'purchase_date', 'payment_method', 'transaction_id', 'created_at',
            'updated_at', 'expires_at', 'is_available', 'remaining_licenses'
        ]
        read_only_fields = [
            'id', 'license_id', 'created_at', 'updated_at', 'features_display',
            'price_display', 'purchaser_name', 'is_available', 'remaining_licenses'
        ]
    
    def get_remaining_licenses(self, obj):
        """Return count of remaining available licenses"""
        return LegacyLicense.objects.filter(status='available').count()
    
    def to_representation(self, instance):
        """Custom representation with computed fields"""
        data = super().to_representation(instance)
        data['is_available'] = instance.is_available()
        return data

class LegacyLicenseListSerializer(serializers.ModelSerializer):
    """Simplified serializer for legacy license lists"""
    price_display = serializers.CharField(read_only=True)
    is_available = serializers.BooleanField(read_only=True)
    
    class Meta:
        model = LegacyLicense
        fields = [
            'id', 'license_number', 'license_type', 'status', 'current_price',
            'price_display', 'is_discounted', 'discount_percentage', 'features',
            'lifetime_guarantee', 'is_available', 'created_at'
        ]
    
    def to_representation(self, instance):
        """Custom representation with computed fields"""
        data = super().to_representation(instance)
        data['is_available'] = instance.is_available()
        return data

class LegacyLicenseCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating new legacy licenses"""
    
    class Meta:
        model = LegacyLicense
        fields = [
            'license_number', 'license_type', 'original_price', 'current_price',
            'features', 'storage_limit_gb', 'family_members_limit', 'lifetime_guarantee'
        ]
    
    def validate_license_number(self, value):
        """Validate license number is unique and within range"""
        if LegacyLicense.objects.filter(license_number=value).exists():
            raise serializers.ValidationError("License number already exists")
        if value < 1 or value > 250:
            raise serializers.ValidationError("License number must be between 1 and 250")
        return value

class LegacyLicenseUpdateSerializer(serializers.ModelSerializer):
    """Serializer for updating existing legacy licenses"""
    
    class Meta:
        model = LegacyLicense
        fields = [
            'status', 'current_price', 'features', 'storage_limit_gb',
            'family_members_limit', 'lifetime_guarantee'
        ]

class LicensePurchaseSerializer(serializers.ModelSerializer):
    """Serializer for LicensePurchase model"""
    license_details = LegacyLicenseSerializer(source='license', read_only=True)
    purchaser_name = serializers.CharField(source='purchaser.username', read_only=True)
    
    class Meta:
        model = LicensePurchase
        fields = [
            'id', 'license', 'license_details', 'purchaser', 'purchaser_name',
            'purchase_date', 'amount_paid', 'payment_method', 'transaction_id', 'status'
        ]
        read_only_fields = ['id', 'purchase_date', 'purchaser_name']

class LicensePurchaseCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating new license purchases"""
    
    class Meta:
        model = LicensePurchase
        fields = [
            'license', 'purchaser', 'amount_paid', 'payment_method', 'transaction_id'
        ]
    
    def validate(self, data):
        """Validate purchase data"""
        license_obj = data['license']
        amount_paid = data['amount_paid']
        
        # Check if license is available
        if not license_obj.is_available():
            raise serializers.ValidationError("License is not available for purchase")
        
        # Validate amount matches current price
        if amount_paid != license_obj.current_price:
            raise serializers.ValidationError("Amount paid must match current license price")
        
        return data

class LicenseStatisticsSerializer(serializers.Serializer):
    """Serializer for license statistics"""
    total_licenses = serializers.IntegerField()
    available_licenses = serializers.IntegerField()
    sold_licenses = serializers.IntegerField()
    reserved_licenses = serializers.IntegerField()
    total_revenue = serializers.DecimalField(max_digits=12, decimal_places=2)
    average_price = serializers.DecimalField(max_digits=10, decimal_places=2)
    licenses_by_type = serializers.DictField()
    recent_purchases = serializers.ListField() 