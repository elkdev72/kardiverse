from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q
from django.shortcuts import get_object_or_404

from .models import Memorial
from .serializers import (
    MemorialSerializer, MemorialListSerializer, MemorialCreateSerializer,
    MemorialUpdateSerializer
)

class MemorialViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Memorial model providing CRUD operations and additional actions.
    
    list: Get paginated list of memorials with optional filtering
    create: Create a new memorial
    retrieve: Get detailed information about a specific memorial
    update: Update an existing memorial
    partial_update: Partially update an existing memorial
    destroy: Delete a memorial
    """
    queryset = Memorial.objects.filter(is_active=True)
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['religion', 'language', 'qr_code', 'is_active']
    search_fields = ['name', 'description', 'life_story', 'family_members']
    ordering_fields = ['name', 'created_at', 'updated_at', 'birth_date', 'death_date']
    ordering = ['-created_at']
    
    def get_serializer_class(self):
        """Return appropriate serializer class based on action"""
        if self.action == 'create':
            return MemorialCreateSerializer
        elif self.action in ['update', 'partial_update']:
            return MemorialUpdateSerializer
        elif self.action == 'list':
            return MemorialListSerializer
        return MemorialSerializer
    
    def get_queryset(self):
        """Return filtered queryset based on request parameters"""
        queryset = super().get_queryset()
        
        # Filter by religion if specified
        religion = self.request.query_params.get('religion', None)
        if religion:
            queryset = queryset.filter(religion=religion)
        
        # Filter by categories if specified
        categories = self.request.query_params.get('categories', None)
        if categories:
            category_list = [cat.strip() for cat in categories.split(',')]
            queryset = queryset.filter(categories__overlap=category_list)
        
        # Filter by date range if specified
        start_date = self.request.query_params.get('start_date', None)
        end_date = self.request.query_params.get('end_date', None)
        if start_date:
            queryset = queryset.filter(birth_date__gte=start_date)
        if end_date:
            queryset = queryset.filter(death_date__lte=end_date)
        
        # Filter by language if specified
        language = self.request.query_params.get('language', None)
        if language:
            queryset = queryset.filter(language=language)
        
        return queryset
    
    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Get featured memorials"""
        featured_memorials = self.get_queryset().filter(is_active=True)[:6]
        serializer = MemorialListSerializer(featured_memorials, many=True, context={'request': request})
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def by_religion(self, request):
        """Get memorials grouped by religion"""
        christian_memorials = self.get_queryset().filter(religion='Christian', is_active=True)
        muslim_memorials = self.get_queryset().filter(religion='Muslim', is_active=True)
        
        data = {
            'christian': MemorialListSerializer(christian_memorials, many=True, context={'request': request}).data,
            'muslim': MemorialListSerializer(muslim_memorials, many=True, context={'request': request}).data,
            'total_christian': christian_memorials.count(),
            'total_muslim': muslim_memorials.count()
        }
        return Response(data)
    
    @action(detail=False, methods=['get'])
    def by_category(self, request):
        """Get memorials grouped by category"""
        categories = Memorial.CATEGORY_CHOICES
        data = {}
        
        for category_code, category_name in categories:
            memorials = self.get_queryset().filter(
                categories__contains=[category_code],
                is_active=True
            )
            data[category_code] = {
                'name': category_name,
                'memorials': MemorialListSerializer(memorials, many=True, context={'request': request}).data,
                'count': memorials.count()
            }
        
        return Response(data)
    
    @action(detail=False, methods=['get'])
    def search(self, request):
        """Advanced search with multiple criteria"""
        query = request.query_params.get('q', '')
        religion = request.query_params.get('religion', '')
        categories = request.query_params.get('categories', '')
        language = request.query_params.get('language', '')
        
        queryset = self.get_queryset()
        
        if query:
            queryset = queryset.filter(
                Q(name__icontains=query) |
                Q(description__icontains=query) |
                Q(life_story__icontains=query) |
                Q(family_members__icontains=query)
            )
        
        if religion:
            queryset = queryset.filter(religion=religion)
        
        if categories:
            category_list = [cat.strip() for cat in categories.split(',')]
            queryset = queryset.filter(categories__overlap=category_list)
        
        if language:
            queryset = queryset.filter(language=language)
        
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = MemorialListSerializer(page, many=True, context={'request': request})
            return self.get_paginated_response(serializer.data)
        
        serializer = MemorialListSerializer(queryset, many=True, context={'request': request})
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def qr_code(self, request, pk=None):
        """Get QR code data for a memorial"""
        memorial = self.get_object()
        data = {
            'id': memorial.id,
            'name': memorial.name,
            'qr_code_data': memorial.qr_code_data,
            'qr_code_url': request.build_absolute_uri(memorial.get_absolute_url())
        }
        return Response(data)
    
    @action(detail=False, methods=['get'])
    def statistics(self, request):
        """Get memorial statistics"""
        total_memorials = Memorial.objects.filter(is_active=True).count()
        christian_count = Memorial.objects.filter(religion='Christian', is_active=True).count()
        muslim_count = Memorial.objects.filter(religion='Muslim', is_active=True).count()
        
        # Category statistics
        category_stats = {}
        for category_code, category_name in Memorial.CATEGORY_CHOICES:
            count = Memorial.objects.filter(
                categories__contains=[category_code],
                is_active=True
            ).count()
            category_stats[category_code] = {
                'name': category_name,
                'count': count
            }
        
        # Language statistics
        language_stats = {}
        languages = Memorial.objects.filter(is_active=True).values_list('language', flat=True).distinct()
        for lang in languages:
            count = Memorial.objects.filter(language=lang, is_active=True).count()
            language_stats[lang] = count
        
        data = {
            'total_memorials': total_memorials,
            'religion_breakdown': {
                'christian': christian_count,
                'muslim': muslim_count
            },
            'category_breakdown': category_stats,
            'language_breakdown': language_stats,
            'recent_additions': MemorialListSerializer(
                Memorial.objects.filter(is_active=True).order_by('-created_at')[:5],
                many=True,
                context={'request': request}
            ).data
        }
        return Response(data)
    
    def perform_create(self, serializer):
        """Set created_by user when creating memorial"""
        serializer.save()
    
    def perform_update(self, serializer):
        """Custom update logic if needed"""
        serializer.save()
    
    def perform_destroy(self, instance):
        """Soft delete instead of hard delete"""
        instance.is_active = False
        instance.save()
