from django.shortcuts import render
from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q

from .models import LifePhase, TimelineStory
from .serializers import (
    LifePhaseSerializer, LifePhaseListSerializer,
    TimelineStorySerializer, TimelineStoryCreateSerializer, TimelineStoryUpdateSerializer
)

# Create your views here.

class LifePhaseViewSet(viewsets.ModelViewSet):
    """
    ViewSet for LifePhase model providing CRUD operations and additional actions.
    """
    queryset = LifePhase.objects.filter(is_active=True).order_by('order')
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['is_active', 'order']
    search_fields = ['phase', 'description', 'spiritual_aspect']
    ordering_fields = ['order', 'phase', 'created_at']
    ordering = ['order']
    
    def get_serializer_class(self):
        """Return appropriate serializer class based on action"""
        if self.action == 'list':
            return LifePhaseListSerializer
        return LifePhaseSerializer
    
    @action(detail=False, methods=['get'])
    def ordered(self, request):
        """Get life phases in proper order with stories"""
        phases = self.get_queryset()
        data = []
        
        for phase in phases:
            phase_data = LifePhaseSerializer(phase, context={'request': request}).data
            # Get featured stories for this phase
            featured_stories = TimelineStory.objects.filter(
                life_phase=phase,
                is_featured=True,
                memorial__is_active=True
            )[:3]
            phase_data['featured_stories'] = TimelineStorySerializer(
                featured_stories, many=True, context={'request': request}
            ).data
            data.append(phase_data)
        
        return Response(data)
    
    @action(detail=True, methods=['get'])
    def stories(self, request, pk=None):
        """Get all stories for a specific life phase"""
        phase = self.get_object()
        stories = TimelineStory.objects.filter(
            life_phase=phase,
            memorial__is_active=True
        ).order_by('-created_at')
        
        page = self.paginate_queryset(stories)
        if page is not None:
            serializer = TimelineStorySerializer(page, many=True, context={'request': request})
            return self.get_paginated_response(serializer.data)
        
        serializer = TimelineStorySerializer(stories, many=True, context={'request': request})
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def complete_timeline(self, request):
        """Get complete timeline with all phases and sample stories"""
        phases = self.get_queryset()
        timeline_data = []
        
        for phase in phases:
            phase_data = LifePhaseSerializer(phase, context={'request': request}).data
            # Get a few sample stories for each phase
            sample_stories = TimelineStory.objects.filter(
                life_phase=phase,
                memorial__is_active=True
            ).order_by('-is_featured', '-created_at')[:2]
            
            phase_data['sample_stories'] = TimelineStorySerializer(
                sample_stories, many=True, context={'request': request}
            ).data
            timeline_data.append(phase_data)
        
        return Response({
            'timeline': timeline_data,
            'total_phases': len(timeline_data),
            'description': 'Complete spiritual timeline with life phases and stories'
        })

class TimelineStoryViewSet(viewsets.ModelViewSet):
    """
    ViewSet for TimelineStory model providing CRUD operations and additional actions.
    """
    queryset = TimelineStory.objects.filter(memorial__is_active=True)
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['life_phase', 'memorial', 'is_featured']
    search_fields = ['title', 'content']
    ordering_fields = ['created_at', 'updated_at', 'title']
    ordering = ['-created_at']
    
    def get_serializer_class(self):
        """Return appropriate serializer class based on action"""
        if self.action == 'create':
            return TimelineStoryCreateSerializer
        elif self.action in ['update', 'partial_update']:
            return TimelineStoryUpdateSerializer
        return TimelineStorySerializer
    
    def get_queryset(self):
        """Return filtered queryset based on request parameters"""
        queryset = super().get_queryset()
        
        # Filter by life phase if specified
        life_phase = self.request.query_params.get('life_phase', None)
        if life_phase:
            queryset = queryset.filter(life_phase_id=life_phase)
        
        # Filter by memorial if specified
        memorial = self.request.query_params.get('memorial', None)
        if memorial:
            queryset = queryset.filter(memorial_id=memorial)
        
        # Filter by featured status if specified
        featured = self.request.query_params.get('featured', None)
        if featured is not None:
            featured_bool = featured.lower() == 'true'
            queryset = queryset.filter(is_featured=featured_bool)
        
        return queryset
    
    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Get featured timeline stories"""
        featured_stories = self.get_queryset().filter(is_featured=True)[:6]
        serializer = TimelineStorySerializer(featured_stories, many=True, context={'request': request})
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def by_memorial(self, request):
        """Get stories grouped by memorial"""
        memorial_id = request.query_params.get('memorial_id', None)
        if not memorial_id:
            return Response(
                {'error': 'memorial_id parameter is required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        stories = self.get_queryset().filter(memorial_id=memorial_id)
        
        # Group by life phase
        grouped_stories = {}
        for story in stories:
            phase_name = story.life_phase.phase
            if phase_name not in grouped_stories:
                grouped_stories[phase_name] = []
            grouped_stories[phase_name].append(
                TimelineStorySerializer(story, context={'request': request}).data
            )
        
        return Response({
            'memorial_id': memorial_id,
            'stories_by_phase': grouped_stories,
            'total_stories': stories.count()
        })
    
    @action(detail=False, methods=['get'])
    def by_phase(self, request):
        """Get stories grouped by life phase"""
        phase_id = request.query_params.get('phase_id', None)
        if not phase_id:
            return Response(
                {'error': 'phase_id parameter is required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        stories = self.get_queryset().filter(life_phase_id=phase_id)
        
        # Group by memorial
        grouped_stories = {}
        for story in stories:
            memorial_name = story.memorial.name
            if memorial_name not in grouped_stories:
                grouped_stories[memorial_name] = []
            grouped_stories[memorial_name].append(
                TimelineStorySerializer(story, context={'request': request}).data
            )
        
        return Response({
            'phase_id': phase_id,
            'stories_by_memorial': grouped_stories,
            'total_stories': stories.count()
        })
    
    @action(detail=False, methods=['get'])
    def search(self, request):
        """Search stories by content and title"""
        query = request.query_params.get('q', '')
        life_phase = request.query_params.get('life_phase', '')
        memorial = request.query_params.get('memorial', '')
        
        queryset = self.get_queryset()
        
        if query:
            queryset = queryset.filter(
                Q(title__icontains=query) |
                Q(content__icontains=query)
            )
        
        if life_phase:
            queryset = queryset.filter(life_phase_id=life_phase)
        
        if memorial:
            queryset = queryset.filter(memorial_id=memorial)
        
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = TimelineStorySerializer(page, many=True, context={'request': request})
            return self.get_paginated_response(serializer.data)
        
        serializer = TimelineStorySerializer(queryset, many=True, context={'request': request})
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def statistics(self, request):
        """Get timeline story statistics"""
        total_stories = TimelineStory.objects.filter(memorial__is_active=True).count()
        featured_stories = TimelineStory.objects.filter(
            is_featured=True,
            memorial__is_active=True
        ).count()
        
        # Stories by life phase
        phase_stats = {}
        phases = LifePhase.objects.filter(is_active=True)
        for phase in phases:
            count = TimelineStory.objects.filter(
                life_phase=phase,
                memorial__is_active=True
            ).count()
            phase_stats[phase.phase] = {
                'id': phase.id,
                'count': count
            }
        
        # Recent stories
        recent_stories = TimelineStorySerializer(
            TimelineStory.objects.filter(memorial__is_active=True).order_by('-created_at')[:5],
            many=True,
            context={'request': request}
        ).data
        
        data = {
            'total_stories': total_stories,
            'featured_stories': featured_stories,
            'stories_by_phase': phase_stats,
            'recent_stories': recent_stories
        }
        return Response(data)
    
    def perform_create(self, serializer):
        """Custom create logic if needed"""
        serializer.save()
    
    def perform_update(self, serializer):
        """Custom update logic if needed"""
        serializer.save()
