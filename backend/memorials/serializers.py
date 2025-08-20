from rest_framework import serializers
from .models import Memorial

class MemorialSerializer(serializers.ModelSerializer):
    """Serializer for Memorial model"""
    religion_icon = serializers.CharField(read_only=True)
    religion_color_class = serializers.CharField(read_only=True)
    categories_display = serializers.CharField(read_only=True)
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Memorial
        fields = [
            'id', 'name', 'dates', 'birth_date', 'death_date', 'image', 'image_url',
            'religion', 'religion_icon', 'religion_color_class', 'categories', 'categories_display',
            'description', 'qr_code', 'qr_code_data', 'family_members', 'life_story',
            'favorite_quotes', 'achievements', 'created_at', 'updated_at', 'is_active',
            'language', 'get_absolute_url'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at', 'religion_icon', 'religion_color_class']
    
    def get_image_url(self, obj):
        """Return full URL for image if it exists"""
        if obj.image and hasattr(obj.image, 'url'):
            request = self.context.get('request')
            if request is not None:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None
    
    def to_representation(self, instance):
        """Custom representation with computed fields"""
        data = super().to_representation(instance)
        
        # Add computed fields
        data['religion_icon'] = instance.get_religion_icon()
        data['religion_color_class'] = instance.get_religion_color_class()
        data['categories_display'] = instance.get_categories_display()
        data['get_absolute_url'] = instance.get_absolute_url()
        
        return data

class MemorialListSerializer(serializers.ModelSerializer):
    """Simplified serializer for memorial lists"""
    religion_icon = serializers.CharField(read_only=True)
    religion_color_class = serializers.CharField(read_only=True)
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Memorial
        fields = [
            'id', 'name', 'dates', 'image', 'image_url', 'religion', 'religion_icon',
            'religion_color_class', 'categories', 'description', 'qr_code', 'language'
        ]
    
    def get_image_url(self, obj):
        """Return full URL for image if it exists"""
        if obj.image and hasattr(obj.image, 'url'):
            request = self.context.get('request')
            if request is not None:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None
    
    def to_representation(self, instance):
        """Custom representation with computed fields"""
        data = super().to_representation(instance)
        data['religion_icon'] = instance.get_religion_icon()
        data['religion_color_class'] = instance.get_religion_color_class()
        return data

class MemorialCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating new memorials"""
    
    class Meta:
        model = Memorial
        fields = [
            'name', 'dates', 'birth_date', 'death_date', 'image', 'religion',
            'categories', 'description', 'qr_code', 'family_members', 'life_story',
            'favorite_quotes', 'achievements', 'language'
        ]
    
    def validate_categories(self, value):
        """Validate that categories are from allowed choices"""
        allowed_categories = [choice[0] for choice in Memorial.CATEGORY_CHOICES]
        for category in value:
            if category not in allowed_categories:
                raise serializers.ValidationError(f"Invalid category: {category}")
        return value
    
    def validate_religion(self, value):
        """Validate religion choice"""
        allowed_religions = [choice[0] for choice in Memorial.RELIGION_CHOICES]
        if value not in allowed_religions:
            raise serializers.ValidationError(f"Invalid religion: {value}")
        return value

class MemorialUpdateSerializer(serializers.ModelSerializer):
    """Serializer for updating existing memorials"""
    
    class Meta:
        model = Memorial
        fields = [
            'name', 'dates', 'birth_date', 'death_date', 'image', 'religion',
            'categories', 'description', 'qr_code', 'family_members', 'life_story',
            'favorite_quotes', 'achievements', 'language', 'is_active'
        ]
    
    def validate_categories(self, value):
        """Validate that categories are from allowed choices"""
        allowed_categories = [choice[0] for choice in Memorial.CATEGORY_CHOICES]
        for category in value:
            if category not in allowed_categories:
                raise serializers.ValidationError(f"Invalid category: {category}")
        return value 