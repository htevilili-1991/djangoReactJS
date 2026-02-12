from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DashboardItemViewSet, login, current_user, logout, profile_view, profile_avatar_upload

router = DefaultRouter()
router.register(r'items', DashboardItemViewSet)

urlpatterns = [
    path('auth/login/', login),
    path('auth/me/', current_user),
    path('auth/logout/', logout),
    path('profile/', profile_view),
    path('profile/avatar/', profile_avatar_upload),
    path('', include(router.urls)),
]