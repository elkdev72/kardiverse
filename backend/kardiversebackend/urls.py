"""
URL configuration for kardiversebackend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import routers
# from rest_framework.documentation import include_docs_urls

# Import ViewSets
from memorials.views import MemorialViewSet
from timeline.views import LifePhaseViewSet, TimelineStoryViewSet
from legacy.views import LegacyLicenseViewSet, LicenseFeatureViewSet, LicensePurchaseViewSet
from wakeroom.views import WakeRoomExperienceViewSet, WakeRoomSessionViewSet, WakeRoomFeatureViewSet

# Create router and register ViewSets
router = routers.DefaultRouter()

# Memorials
router.register(r'memorials', MemorialViewSet, basename='memorial')

# Timeline
router.register(r'timeline/phases', LifePhaseViewSet, basename='lifephase')
router.register(r'timeline/stories', TimelineStoryViewSet, basename='timelinestory')

# Legacy
router.register(r'legacy/licenses', LegacyLicenseViewSet, basename='legacylicense')
router.register(r'legacy/features', LicenseFeatureViewSet, basename='licensefeature')
router.register(r'legacy/purchases', LicensePurchaseViewSet, basename='licensepurchase')

# WakeRoom
router.register(r'wakeroom/experiences', WakeRoomExperienceViewSet, basename='wakeroomexperience')
router.register(r'wakeroom/sessions', WakeRoomSessionViewSet, basename='wakeroomsession')
router.register(r'wakeroom/features', WakeRoomFeatureViewSet, basename='wakeroomfeature')

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # API endpoints
    path('api/v1/', include(router.urls)),
    
    # API documentation (temporarily disabled)
    # path('api/docs/', include_docs_urls(title='Kardiverse API')),
    
    # API authentication (if needed later)
    path('api-auth/', include('rest_framework.urls')),
]

# Serve media files during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
