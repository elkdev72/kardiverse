from django.shortcuts import render
from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q, Count, Avg, Sum
from django.contrib.auth.models import User

from .models import LegacyLicense, LicenseFeature, LicensePurchase
from .serializers import (
    LegacyLicenseSerializer, LegacyLicenseListSerializer, LegacyLicenseCreateSerializer,
    LegacyLicenseUpdateSerializer, LicenseFeatureSerializer, LicensePurchaseSerializer,
    LicensePurchaseCreateSerializer, LicenseStatisticsSerializer
)

class LegacyLicenseViewSet(viewsets.ModelViewSet):
    """
    ViewSet for LegacyLicense model providing CRUD operations and additional actions.
    """
    queryset = LegacyLicense.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['license_type', 'status', 'is_discounted', 'lifetime_guarantee']
    search_fields = ['license_id', 'license_number']
    ordering_fields = ['license_number', 'current_price', 'created_at', 'purchase_date']
    ordering = ['license_number']
    
    def get_serializer_class(self):
        """Return appropriate serializer class based on action"""
        if self.action == 'create':
            return LegacyLicenseCreateSerializer
        elif self.action in ['update', 'partial_update']:
            return LegacyLicenseUpdateSerializer
        elif self.action == 'list':
            return LegacyLicenseListSerializer
        return LegacyLicenseSerializer
    
    def get_queryset(self):
        """Return filtered queryset based on request parameters"""
        queryset = super().get_queryset()
        
        # Filter by status if specified
        status_filter = self.request.query_params.get('status', None)
        if status_filter:
            queryset = queryset.filter(status=status_filter)
        
        # Filter by price range if specified
        min_price = self.request.query_params.get('min_price', None)
        max_price = self.request.query_params.get('max_price', None)
        if min_price:
            queryset = queryset.filter(current_price__gte=min_price)
        if max_price:
            queryset = queryset.filter(current_price__lte=max_price)
        
        # Filter by license type if specified
        license_type = self.request.query_params.get('license_type', None)
        if license_type:
            queryset = queryset.filter(license_type=license_type)
        
        return queryset
    
    @action(detail=False, methods=['get'])
    def available(self, request):
        """Get available licenses for purchase"""
        available_licenses = self.get_queryset().filter(status='available')
        serializer = LegacyLicenseListSerializer(available_licenses, many=True, context={'request': request})
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Get featured licenses"""
        featured_licenses = self.get_queryset().filter(
            status='available',
            license_type='FOMO_250'
        )[:6]
        serializer = LegacyLicenseListSerializer(featured_licenses, many=True, context={'request': request})
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def by_type(self, request):
        """Get licenses grouped by type"""
        license_types = LegacyLicense.LICENSE_TYPES
        data = {}
        
        for type_code, type_name in license_types:
            licenses = self.get_queryset().filter(license_type=type_code)
            data[type_code] = {
                'name': type_name,
                'licenses': LegacyLicenseListSerializer(licenses, many=True, context={'request': request}).data,
                'count': licenses.count(),
                'available_count': licenses.filter(status='available').count()
            }
        
        return Response(data)
    
    @action(detail=False, methods=['get'])
    def by_status(self, request):
        """Get licenses grouped by status"""
        status_choices = LegacyLicense.STATUS_CHOICES
        data = {}
        
        for status_code, status_name in status_choices:
            licenses = self.get_queryset().filter(status=status_code)
            data[status_code] = {
                'name': status_name,
                'licenses': LegacyLicenseListSerializer(licenses, many=True, context={'request': request}).data,
                'count': licenses.count()
            }
        
        return Response(data)
    
    @action(detail=True, methods=['post'])
    def reserve(self, request, pk=None):
        """Reserve a license for a user"""
        license_obj = self.get_object()
        user = request.user
        
        if not user.is_authenticated:
            return Response(
                {'error': 'Authentication required'}, 
                status=status.HTTP_401_UNAUTHORIZED
            )
        
        if license_obj.reserve_license(user):
            serializer = LegacyLicenseSerializer(license_obj, context={'request': request})
            return Response({
                'message': 'License reserved successfully',
                'license': serializer.data
            })
        else:
            return Response(
                {'error': 'License is not available for reservation'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
    
    @action(detail=True, methods=['post'])
    def purchase(self, request, pk=None):
        """Purchase a license"""
        license_obj = self.get_object()
        user = request.user
        
        if not user.is_authenticated:
            return Response(
                {'error': 'Authentication required'}, 
                status=status.HTTP_401_UNAUTHORIZED
            )
        
        payment_method = request.data.get('payment_method', '')
        transaction_id = request.data.get('transaction_id', '')
        
        if not payment_method or not transaction_id:
            return Response(
                {'error': 'Payment method and transaction ID are required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if license_obj.purchase_license(user, payment_method, transaction_id):
            # Create purchase record
            LicensePurchase.objects.create(
                license=license_obj,
                purchaser=user,
                amount_paid=license_obj.current_price,
                payment_method=payment_method,
                transaction_id=transaction_id
            )
            
            serializer = LegacyLicenseSerializer(license_obj, context={'request': request})
            return Response({
                'message': 'License purchased successfully',
                'license': serializer.data
            })
        else:
            return Response(
                {'error': 'License is not available for purchase'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
    
    @action(detail=False, methods=['get'])
    def statistics(self, request):
        """Get comprehensive license statistics"""
        total_licenses = LegacyLicense.objects.count()
        available_licenses = LegacyLicense.objects.filter(status='available').count()
        sold_licenses = LegacyLicense.objects.filter(status='sold').count()
        reserved_licenses = LegacyLicense.objects.filter(status='reserved').count()
        
        # Revenue calculations
        sold_licenses_data = LegacyLicense.objects.filter(status='sold')
        total_revenue = sold_licenses_data.aggregate(total=Sum('current_price'))['total'] or 0
        average_price = sold_licenses_data.aggregate(avg=Avg('current_price'))['avg'] or 0
        
        # Licenses by type
        licenses_by_type = {}
        for type_code, type_name in LegacyLicense.LICENSE_TYPES:
            count = LegacyLicense.objects.filter(license_type=type_code).count()
            licenses_by_type[type_code] = {
                'name': type_name,
                'count': count,
                'available': LegacyLicense.objects.filter(license_type=type_code, status='available').count()
            }
        
        # Recent purchases
        recent_purchases = LicensePurchase.objects.select_related('license', 'purchaser').order_by('-purchase_date')[:5]
        recent_purchases_data = LicensePurchaseSerializer(recent_purchases, many=True, context={'request': request}).data
        
        data = {
            'total_licenses': total_licenses,
            'available_licenses': available_licenses,
            'sold_licenses': sold_licenses,
            'reserved_licenses': reserved_licenses,
            'total_revenue': total_revenue,
            'average_price': average_price,
            'licenses_by_type': licenses_by_type,
            'recent_purchases': recent_purchases_data
        }
        
        serializer = LicenseStatisticsSerializer(data)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def remaining_count(self, request):
        """Get count of remaining available licenses"""
        remaining = LegacyLicense.objects.filter(status='available').count()
        return Response({'remaining_licenses': remaining})

class LicenseFeatureViewSet(viewsets.ModelViewSet):
    """
    ViewSet for LicenseFeature model.
    """
    queryset = LicenseFeature.objects.filter(is_active=True)
    serializer_class = LicenseFeatureSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'is_active']
    search_fields = ['name', 'description']
    ordering_fields = ['name', 'category']
    ordering = ['name']
    
    @action(detail=False, methods=['get'])
    def by_category(self, request):
        """Get features grouped by category"""
        categories = LicenseFeature.objects.values_list('category', flat=True).distinct()
        data = {}
        
        for category in categories:
            features = self.get_queryset().filter(category=category)
            data[category] = LicenseFeatureSerializer(features, many=True, context={'request': request}).data
        
        return Response(data)

class LicensePurchaseViewSet(viewsets.ModelViewSet):
    """
    ViewSet for LicensePurchase model.
    """
    queryset = LicensePurchase.objects.all()
    serializer_class = LicensePurchaseSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'payment_method']
    search_fields = ['transaction_id', 'purchaser__username']
    ordering_fields = ['purchase_date', 'amount_paid']
    ordering = ['-purchase_date']
    
    def get_serializer_class(self):
        """Return appropriate serializer class based on action"""
        if self.action == 'create':
            return LicensePurchaseCreateSerializer
        return LicensePurchaseSerializer
    
    @action(detail=False, methods=['get'])
    def by_user(self, request):
        """Get purchases for a specific user"""
        user_id = request.query_params.get('user_id', None)
        if not user_id:
            return Response(
                {'error': 'user_id parameter is required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        purchases = self.get_queryset().filter(purchaser_id=user_id)
        serializer = LicensePurchaseSerializer(purchases, many=True, context={'request': request})
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def revenue_summary(self, request):
        """Get revenue summary by date range"""
        from datetime import datetime, timedelta
        
        # Get date range from query params
        days = int(request.query_params.get('days', 30))
        end_date = datetime.now()
        start_date = end_date - timedelta(days=days)
        
        purchases = self.get_queryset().filter(
            purchase_date__gte=start_date,
            purchase_date__lte=end_date
        )
        
        total_revenue = purchases.aggregate(total=Sum('amount_paid'))['total'] or 0
        total_purchases = purchases.count()
        average_purchase = purchases.aggregate(avg=Avg('amount_paid'))['avg'] or 0
        
        # Revenue by day
        daily_revenue = {}
        current_date = start_date
        while current_date <= end_date:
            day_purchases = purchases.filter(purchase_date__date=current_date.date())
            daily_revenue[current_date.strftime('%Y-%m-%d')] = {
                'revenue': day_purchases.aggregate(total=Sum('amount_paid'))['total'] or 0,
                'purchases': day_purchases.count()
            }
            current_date += timedelta(days=1)
        
        return Response({
            'period_days': days,
            'start_date': start_date,
            'end_date': end_date,
            'total_revenue': total_revenue,
            'total_purchases': total_purchases,
            'average_purchase': average_purchase,
            'daily_revenue': daily_revenue
        })
