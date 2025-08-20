from rest_framework import serializers
from .models import LifePhase, TimelineStory

class LifePhaseSerializer(serializers.ModelSerializer):
    """Serializer for LifePhase model"""
    milestones_display = serializers.CharField(read_only=True)
    color_classes = serializers.SerializerMethodField()
    icon_component = serializers.CharField(read_only=True)
    
    class Meta:
        model = LifePhase
        fields = [
            'id', 'phase', 'age_range', 'icon_name', 'icon_component', 'color_class',
            'icon_color_class', 'color_classes', 'description', 'milestones',
            'milestones_display', 'spiritual_aspect', 'order', 'is_active',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at', 'milestones_display', 'color_classes']
    
    def get_color_classes(self, obj):
        """Return color classes object"""
        return obj.get_color_classes()
    
    def to_representation(self, instance):
        """Custom representation with computed fields"""
        data = super().to_representation(instance)
        data['icon_component'] = instance.get_icon_component()
        return data

class LifePhaseListSerializer(serializers.ModelSerializer):
    """Simplified serializer for life phase lists"""
    icon_component = serializers.CharField(read_only=True)
    color_classes = serializers.SerializerMethodField()
    
    class Meta:
        model = LifePhase
        fields = [
            'id', 'phase', 'age_range', 'icon_name', 'icon_component', 'color_class',
            'icon_color_class', 'color_classes', 'description', 'milestones',
            'spiritual_aspect', 'order'
        ]
    
    def get_color_classes(self, obj):
        """Return color classes object"""
        return obj.get_color_classes()
    
    def to_representation(self, instance):
        """Custom representation with computed fields"""
        data = super().to_representation(instance)
        data['icon_component'] = instance.get_icon_component()
        return data

class TimelineStorySerializer(serializers.ModelSerializer):
    """Serializer for TimelineStory model"""
    memorial_name = serializers.CharField(source='memorial.name', read_only=True)
    life_phase_name = serializers.CharField(source='life_phase.phase', read_only=True)
    image_url = serializers.SerializerMethodField()
    audio_url = serializers.SerializerMethodField()
    video_url = serializers.SerializerMethodField()
    
    class Meta:
        model = TimelineStory
        fields = [
            'id', 'title', 'content', 'life_phase', 'life_phase_name', 'memorial',
            'memorial_name', 'image', 'image_url', 'audio_file', 'audio_url',
            'video_file', 'video_url', 'created_at', 'updated_at', 'is_featured'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at', 'memorial_name', 'life_phase_name']
    
    def get_image_url(self, obj):
        """Return full URL for image if it exists"""
        if obj.image and hasattr(obj.image, 'url'):
            request = self.context.get('request')
            if request is not None:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None
    
    def get_audio_url(self, obj):
        """Return full URL for audio file if it exists"""
        if obj.audio_file and hasattr(obj.audio_file, 'url'):
            request = self.context.get('request')
            if request is not None:
                return request.build_absolute_uri(obj.audio_file.url)
            return obj.audio_file.url
        return None
    
    def get_video_url(self, obj):
        """Return full URL for video file if it exists"""
        if obj.video_file and hasattr(obj.video_file, 'url'):
            request = self.context.get('request')
            if request is not None:
                return request.build_absolute_uri(obj.video_file.url)
            return obj.video_file.url
        return None

class TimelineStoryCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating new timeline stories"""
    
    class Meta:
        model = TimelineStory
        fields = [
            'title', 'content', 'life_phase', 'memorial', 'image', 'audio_file',
            'video_file', 'is_featured'
        ]

class TimelineStoryUpdateSerializer(serializers.ModelSerializer):
    """Serializer for updating existing timeline stories"""
    
    class Meta:
        model = TimelineStory
        fields = [
            'title', 'content', 'life_phase', 'memorial', 'image', 'audio_file',
            'video_file', 'is_featured'
        ] 