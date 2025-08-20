from rest_framework import serializers
from .models import WakeRoomExperience, WakeRoomSession, WakeRoomFeature

class WakeRoomFeatureSerializer(serializers.ModelSerializer):
    """Serializer for WakeRoomFeature model"""
    icon_component = serializers.CharField(read_only=True)
    
    class Meta:
        model = WakeRoomFeature
        fields = [
            'id', 'name', 'description', 'icon_name', 'icon_component', 'is_active',
            'feature_type', 'technical_requirements'
        ]
        read_only_fields = ['id']
    
    def to_representation(self, instance):
        """Custom representation with computed fields"""
        data = super().to_representation(instance)
        data['icon_component'] = instance.get_icon_component()
        return data

class WakeRoomExperienceSerializer(serializers.ModelSerializer):
    """Serializer for WakeRoomExperience model"""
    media_files = serializers.SerializerMethodField()
    experience_duration = serializers.CharField(read_only=True)
    technology_requirements = serializers.SerializerMethodField()
    is_available = serializers.BooleanField(read_only=True)
    created_by_name = serializers.CharField(source='created_by.username', read_only=True)
    associated_memorials_count = serializers.SerializerMethodField()
    
    class Meta:
        model = WakeRoomExperience
        fields = [
            'id', 'title', 'description', 'experience_type', 'status', 'demo_video',
            'thumbnail_image', 'ar_model_file', 'vr_scene_file', 'media_files',
            'qr_code_required', 'qr_code_data', 'nfc_enabled', 'nfc_data',
            'duration_minutes', 'experience_duration', 'is_immersive',
            'requires_headset', 'spatial_audio', 'associated_memorials',
            'associated_memorials_count', 'created_by', 'created_by_name',
            'created_at', 'updated_at', 'is_featured', 'is_available',
            'technology_requirements'
        ]
        read_only_fields = [
            'id', 'created_at', 'updated_at', 'media_files', 'experience_duration',
            'technology_requirements', 'is_available', 'created_by_name', 'associated_memorials_count'
        ]
    
    def get_media_files(self, obj):
        """Return list of available media files with URLs"""
        media_files = obj.get_media_files()
        request = self.context.get('request')
        
        if request is not None:
            formatted_files = []
            for file_type, file_obj in media_files:
                if hasattr(file_obj, 'url'):
                    url = request.build_absolute_uri(file_obj.url)
                    formatted_files.append({
                        'type': file_type,
                        'url': url,
                        'filename': file_obj.name
                    })
            return formatted_files
        return []
    
    def get_technology_requirements(self, obj):
        """Return list of technology requirements"""
        return obj.get_technology_requirements()
    
    def get_associated_memorials_count(self, obj):
        """Return count of associated memorials"""
        return obj.associated_memorials.count()
    
    def to_representation(self, instance):
        """Custom representation with computed fields"""
        data = super().to_representation(instance)
        data['is_available'] = instance.is_available()
        return data

class WakeRoomExperienceListSerializer(serializers.ModelSerializer):
    """Simplified serializer for WakeRoom experience lists"""
    experience_duration = serializers.CharField(read_only=True)
    is_available = serializers.BooleanField(read_only=True)
    thumbnail_url = serializers.SerializerMethodField()
    
    class Meta:
        model = WakeRoomExperience
        fields = [
            'id', 'title', 'description', 'experience_type', 'status',
            'thumbnail_image', 'thumbnail_url', 'duration_minutes', 'experience_duration',
            'is_immersive', 'requires_headset', 'spatial_audio', 'is_featured',
            'is_available', 'created_at'
        ]
    
    def get_thumbnail_url(self, obj):
        """Return full URL for thumbnail if it exists"""
        if obj.thumbnail_image and hasattr(obj.thumbnail_image, 'url'):
            request = self.context.get('request')
            if request is not None:
                return request.build_absolute_uri(obj.thumbnail_image.url)
            return obj.thumbnail_image.url
        return None
    
    def to_representation(self, instance):
        """Custom representation with computed fields"""
        data = super().to_representation(instance)
        data['is_available'] = instance.is_available()
        return data

class WakeRoomExperienceCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating new WakeRoom experiences"""
    
    class Meta:
        model = WakeRoomExperience
        fields = [
            'title', 'description', 'experience_type', 'demo_video', 'thumbnail_image',
            'ar_model_file', 'vr_scene_file', 'qr_code_required', 'nfc_enabled',
            'duration_minutes', 'is_immersive', 'requires_headset', 'spatial_audio',
            'associated_memorials', 'is_featured'
        ]

class WakeRoomExperienceUpdateSerializer(serializers.ModelSerializer):
    """Serializer for updating existing WakeRoom experiences"""
    
    class Meta:
        model = WakeRoomExperience
        fields = [
            'title', 'description', 'experience_type', 'status', 'demo_video',
            'thumbnail_image', 'ar_model_file', 'vr_scene_file', 'qr_code_required',
            'nfc_enabled', 'duration_minutes', 'is_immersive', 'requires_headset',
            'spatial_audio', 'associated_memorials', 'is_featured'
        ]

class WakeRoomSessionSerializer(serializers.ModelSerializer):
    """Serializer for WakeRoomSession model"""
    experience_title = serializers.CharField(source='experience.title', read_only=True)
    memorial_name = serializers.CharField(source='memorial.name', read_only=True)
    user_name = serializers.CharField(source='user.username', read_only=True)
    duration_display = serializers.CharField(read_only=True)
    is_active = serializers.BooleanField(read_only=True)
    
    class Meta:
        model = WakeRoomSession
        fields = [
            'id', 'user', 'user_name', 'experience', 'experience_title', 'memorial',
            'memorial_name', 'start_time', 'end_time', 'duration_seconds', 'duration_display',
            'interactions_count', 'completed_milestones', 'user_feedback', 'rating',
            'device_type', 'browser_info', 'ip_address', 'is_active'
        ]
        read_only_fields = [
            'id', 'start_time', 'experience_title', 'memorial_name', 'user_name',
            'duration_display', 'is_active'
        ]
    
    def to_representation(self, instance):
        """Custom representation with computed fields"""
        data = super().to_representation(instance)
        data['is_active'] = instance.is_active()
        return data

class WakeRoomSessionCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating new WakeRoom sessions"""
    
    class Meta:
        model = WakeRoomSession
        fields = [
            'experience', 'memorial', 'device_type', 'browser_info', 'ip_address'
        ]

class WakeRoomSessionUpdateSerializer(serializers.ModelSerializer):
    """Serializer for updating existing WakeRoom sessions"""
    
    class Meta:
        model = WakeRoomSession
        fields = [
            'end_time', 'interactions_count', 'completed_milestones', 'user_feedback', 'rating'
        ]

class WakeRoomStatisticsSerializer(serializers.Serializer):
    """Serializer for WakeRoom statistics"""
    total_experiences = serializers.IntegerField()
    active_experiences = serializers.IntegerField()
    total_sessions = serializers.IntegerField()
    active_sessions = serializers.IntegerField()
    average_session_duration = serializers.FloatField()
    experiences_by_type = serializers.DictField()
    recent_sessions = serializers.ListField()
    top_experiences = serializers.ListField() 