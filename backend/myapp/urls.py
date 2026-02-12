from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DashboardItemViewSet, login, current_user, logout

router = DefaultRouter()
router.register(r'items', DashboardItemViewSet)

urlpatterns = [
    path('auth/login/', login),
    path('auth/me/', current_user),
    path('auth/logout/', logout),
    path('', include(router.urls)),
]