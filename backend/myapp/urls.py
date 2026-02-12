from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DashboardItemViewSet

router = DefaultRouter()
router.register(r'items', DashboardItemViewSet)

urlpatterns = [
    path('', include(router.urls)),
]