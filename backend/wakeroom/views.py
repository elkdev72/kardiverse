from django.shortcuts import render
from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q, Count, Avg
from django.contrib.auth.models import User

from .models import WakeRoomExperience, WakeRoomSession, WakeRoomFeature
from .serializers import (
    WakeRoomExperienceSerializer, WakeRoomExperienceListSerializer,
    WakeRoomExperienceCreateSerializer, WakeRoomExperienceUpdateSerializer,
    WakeRoomSessionSerializer, WakeRoomSessionCreateSerializer, WakeRoomSessionUpdateSerializer,
    WakeRoomFeatureSerializer, WakeRoomStatisticsSerializer
)

# Create your views here.

class WakeRoomExperienceViewSet(viewsets.ModelViewSet):
    """
    ViewSet for WakeRoomExperience model providing CRUD operations and additional actions.
    """
    queryset = WakeRoomExperience.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['experience_type', 'status', 'is_immersive', 'requires_headset', 'spatial_audio']
    search_fields = ['title', 'description']
    ordering_fields = ['title', 'created_at', 'duration_minutes']
    ordering = ['-created_at']
    
    def get_serializer_class(self):
        """Return appropriate serializer class based on action"""
        if self.action == 'create':
            return WakeRoomExperienceCreateSerializer
        elif self.action in ['update', 'partial_update']:
            return WakeRoomExperienceUpdateSerializer
        elif self.action == 'list':
            return WakeRoomExperienceListSerializer
        return WakeRoomExperienceSerializer
    
    def get_queryset(self):
        """Return filtered queryset based on request parameters"""
        queryset = super().get_queryset()
        
        # Filter by experience type if specified
        experience_type = self.request.query_params.get('experience_type', None)
        if experience_type:
            queryset = queryset.filter(experience_type=experience_type)
        
        # Filter by status if specified
        status_filter = self.request.query_params.get('status', None)
        if status_filter:
            queryset = queryset.filter(status=status_filter)
        
        # Filter by duration range if specified
        min_duration = self.request.query_params.get('min_duration', None)
        max_duration = self.request.query_params.get('max_duration', None)
        if min_duration:
            queryset = queryset.filter(duration_minutes__gte=min_duration)
        if max_duration:
            queryset = queryset.filter(duration_minutes__lte=max_duration)
        
        # Filter by memorial if specified
        memorial_id = self.request.query_params.get('memorial_id', None)
        if memorial_id:
            queryset = queryset.filter(associated_memorials__id=memorial_id)
        
        return queryset
    
    @action(detail=False, methods=['get'])
    def active(self, request):
        """Get active WakeRoom experiences"""
        active_experiences = self.get_queryset().filter(status='active')
        serializer = WakeRoomExperienceListSerializer(active_experiences, many=True, context={'request': request})
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Get featured WakeRoom experiences"""
        featured_experiences = self.get_queryset().filter(is_featured=True, status='active')
        serializer = WakeRoomExperienceListSerializer(featured_experiences, many=True, context={'request': request})
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def by_type(self, request):
        """Get experiences grouped by type"""
        experience_types = WakeRoomExperience.EXPERIENCE_TYPES
        data = {}
        
        for type_code, type_name in experience_types:
            experiences = self.get_queryset().filter(experience_type=type_code)
            data[type_code] = {
                'name': type_name,
                'experiences': WakeRoomExperienceListSerializer(experiences, many=True, context={'request': request}).data,
                'count': experiences.count(),
                'active_count': experiences.filter(status='active').count()
            }
        
        return Response(data)
    
    @action(detail=False, methods=['get'])
    def by_memorial(self, request):
        """Get experiences associated with a specific memorial"""
        memorial_id = request.query_params.get('memorial_id', None)
        if not memorial_id:
            return Response(
                {'error': 'memorial_id parameter is required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        experiences = self.get_queryset().filter(associated_memorials__id=memorial_id)
        serializer = WakeRoomExperienceListSerializer(experiences, many=True, context={'request': request})
        return Response({
            'memorial_id': memorial_id,
            'experiences': serializer.data,
            'count': experiences.count()
        })
    
    @action(detail=True, methods=['get'])
    def requirements(self, request, pk=None):
        """Get technology requirements for an experience"""
        experience = self.get_object()
        requirements = experience.get_technology_requirements()
        return Response({
            'experience_id': experience.id,
            'title': experience.title,
            'requirements': requirements,
            'duration': experience.get_experience_duration()
        })
    
    @action(detail=True, methods=['get'])
    def media_files(self, request, pk=None):
        """Get media files for an experience"""
        experience = self.get_object()
        media_files = experience.get_media_files()
        request_obj = self.request
        
        formatted_files = []
        for file_type, file_obj in media_files:
            if hasattr(file_obj, 'url'):
                url = request_obj.build_absolute_uri(file_obj.url)
                formatted_files.append({
                    'type': file_type,
                    'url': url,
                    'filename': file_obj.name
                })
        
        return Response({
            'experience_id': experience.id,
            'title': experience.title,
            'media_files': formatted_files
        })
    
    @action(detail=False, methods=['get'])
    def search(self, request):
        """Search experiences by content and type"""
        query = request.query_params.get('q', '')
        experience_type = request.query_params.get('experience_type', '')
        status_filter = request.query_params.get('status', '')
        
        queryset = self.get_queryset()
        
        if query:
            queryset = queryset.filter(
                Q(title__icontains=query) |
                Q(description__icontains=query)
            )
        
        if experience_type:
            queryset = queryset.filter(experience_type=experience_type)
        
        if status_filter:
            queryset = queryset.filter(status=status_filter)
        
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = WakeRoomExperienceListSerializer(page, many=True, context={'request': request})
            return self.get_paginated_response(serializer.data)
        
        serializer = WakeRoomExperienceListSerializer(queryset, many=True, context={'request': request})
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def statistics(self, request):
        """Get WakeRoom experience statistics"""
        total_experiences = WakeRoomExperience.objects.count()
        active_experiences = WakeRoomExperience.objects.filter(status='active').count()
        total_sessions = WakeRoomSession.objects.count()
        active_sessions = WakeRoomSession.objects.filter(end_time__isnull=True).count()
        
        # Average session duration
        completed_sessions = WakeRoomSession.objects.filter(end_time__isnull=False)
        avg_duration = completed_sessions.aggregate(avg=Avg('duration_seconds'))['avg'] or 0
        
        # Experiences by type
        experiences_by_type = {}
        for type_code, type_name in WakeRoomExperience.EXPERIENCE_TYPES:
            count = WakeRoomExperience.objects.filter(experience_type=type_code).count()
            experiences_by_type[type_code] = {
                'name': type_name,
                'count': count,
                'active': WakeRoomExperience.objects.filter(experience_type=type_code, status='active').count()
            }
        
        # Recent sessions
        recent_sessions = WakeRoomSession.objects.select_related('experience', 'memorial', 'user').order_by('-start_time')[:5]
        recent_sessions_data = WakeRoomSessionSerializer(recent_sessions, many=True, context={'request': request}).data
        
        # Top experiences by session count
        top_experiences = WakeRoomExperience.objects.annotate(
            session_count=Count('sessions')
        ).order_by('-session_count')[:5]
        top_experiences_data = WakeRoomExperienceListSerializer(top_experiences, many=True, context={'request': request}).data
        
        data = {
            'total_experiences': total_experiences,
            'active_experiences': active_experiences,
            'total_sessions': total_sessions,
            'active_sessions': active_sessions,
            'average_session_duration': avg_duration,
            'experiences_by_type': experiences_by_type,
            'recent_sessions': recent_sessions_data,
            'top_experiences': top_experiences_data
        }
        
        serializer = WakeRoomStatisticsSerializer(data)
        return Response(serializer.data)

class WakeRoomSessionViewSet(viewsets.ModelViewSet):
    """
    ViewSet for WakeRoomSession model.
    """
    queryset = WakeRoomSession.objects.all()
    serializer_class = WakeRoomSessionSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['experience', 'memorial', 'user', 'device_type']
    search_fields = ['user__username', 'memorial__name', 'experience__title']
    ordering_fields = ['start_time', 'end_time', 'duration_seconds', 'rating']
    ordering = ['-start_time']
    
    def get_serializer_class(self):
        """Return appropriate serializer class based on action"""
        if self.action == 'create':
            return WakeRoomSessionCreateSerializer
        elif self.action in ['update', 'partial_update']:
            return WakeRoomSessionUpdateSerializer
        return WakeRoomSessionSerializer
    
    @action(detail=False, methods=['get'])
    def active(self, request):
        """Get active sessions"""
        active_sessions = self.get_queryset().filter(end_time__isnull=True)
        serializer = WakeRoomSessionSerializer(active_sessions, many=True, context={'request': request})
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def by_user(self, request):
        """Get sessions for a specific user"""
        user_id = request.query_params.get('user_id', None)
        if not user_id:
            return Response(
                {'error': 'user_id parameter is required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        sessions = self.get_queryset().filter(user_id=user_id)
        serializer = WakeRoomSessionSerializer(sessions, many=True, context={'request': request})
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def by_experience(self, request):
        """Get sessions for a specific experience"""
        experience_id = request.query_params.get('experience_id', None)
        if not experience_id:
            return Response(
                {'error': 'experience_id parameter is required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        sessions = self.get_queryset().filter(experience_id=experience_id)
        serializer = WakeRoomSessionSerializer(sessions, many=True, context={'request': request})
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def end_session(self, request, pk=None):
        """End a WakeRoom session"""
        session = self.get_object()
        
        if session.end_time:
            return Response(
                {'error': 'Session already ended'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Update session data from request
        interactions_count = request.data.get('interactions_count', session.interactions_count)
        completed_milestones = request.data.get('completed_milestones', session.completed_milestones)
        user_feedback = request.data.get('user_feedback', session.user_feedback)
        rating = request.data.get('rating', session.rating)
        
        session.interactions_count = interactions_count
        session.completed_milestones = completed_milestones
        session.user_feedback = user_feedback
        session.rating = rating
        session.end_session()
        
        serializer = WakeRoomSessionSerializer(session, context={'request': request})
        return Response({
            'message': 'Session ended successfully',
            'session': serializer.data
        })

class WakeRoomFeatureViewSet(viewsets.ModelViewSet):
    """
    ViewSet for WakeRoomFeature model.
    """
    queryset = WakeRoomFeature.objects.filter(is_active=True)
    serializer_class = WakeRoomFeatureSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['feature_type', 'is_active']
    search_fields = ['name', 'description']
    ordering_fields = ['name', 'feature_type']
    ordering = ['name']
    
    @action(detail=False, methods=['get'])
    def by_category(self, request):
        """Get features grouped by category"""
        categories = WakeRoomFeature.objects.values_list('feature_type', flat=True).distinct()
        data = {}
        
        for category in categories:
            features = self.get_queryset().filter(feature_type=category)
            data[category] = WakeRoomFeatureSerializer(features, many=True, context={'request': request}).data
        
        return Response(data)
