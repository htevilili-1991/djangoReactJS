from django.shortcuts import render
from django.contrib.auth import authenticate
from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

def index(request):
    return render(request, 'index.html')

# Add the API viewset below
from .models import DashboardItem
from .serializers import DashboardItemSerializer

class DashboardItemViewSet(viewsets.ModelViewSet):
    queryset = DashboardItem.objects.all()
    serializer_class = DashboardItemSerializer


# Auth API
@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    """Login with username and password. Returns token and user info."""
    username = request.data.get('username')
    password = request.data.get('password')
    if not username or not password:
        return Response(
            {'error': 'Username and password required'},
            status=status.HTTP_400_BAD_REQUEST
        )
    user = authenticate(request, username=username, password=password)
    if user is None:
        return Response(
            {'error': 'Invalid username or password'},
            status=status.HTTP_401_UNAUTHORIZED
        )
    token, _ = Token.objects.get_or_create(user=user)
    avatar_url = _get_avatar_url(user, request)
    return Response({
        'token': token.key,
        'user': {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'is_staff': user.is_staff,
            'is_superuser': user.is_superuser,
            'avatar_url': avatar_url,
        }
    })


def _get_avatar_url(user, request):
    """Get avatar URL from user's profile if it exists."""
    try:
        profile = user.profile
        if profile.avatar:
            return request.build_absolute_uri(profile.avatar.url)
    except Exception:  # UserProfile.DoesNotExist or no avatar
        pass
    return None


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_user(request):
    """Get current authenticated user."""
    user = request.user
    avatar_url = _get_avatar_url(user, request)
    return Response({
        'user': {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'is_staff': user.is_staff,
            'is_superuser': user.is_superuser,
            'avatar_url': avatar_url,
        }
    })


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    """Logout by deleting the token."""
    try:
        request.user.auth_token.delete()
    except Exception:
        pass
    return Response(status=status.HTTP_204_NO_CONTENT)


# Profile API
from .models import UserProfile
from .serializers import UserProfileSerializer


def get_or_create_profile(user):
    """Get or create UserProfile for user."""
    profile, _ = UserProfile.objects.get_or_create(user=user)
    return profile


@api_view(['GET', 'PUT', 'PATCH'])
@permission_classes([IsAuthenticated])
def profile_view(request):
    """Get or update current user's profile."""
    profile = get_or_create_profile(request.user)
    if request.method == 'GET':
        serializer = UserProfileSerializer(profile, context={'request': request})
        return Response(serializer.data)
    elif request.method in ('PUT', 'PATCH'):
        serializer = UserProfileSerializer(
            profile, data=request.data, partial=(request.method == 'PATCH'),
            context={'request': request}
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def profile_avatar_upload(request):
    """Upload profile avatar."""
    profile = get_or_create_profile(request.user)
    avatar_file = request.FILES.get('avatar')
    if not avatar_file:
        return Response({'error': 'No avatar file provided'}, status=status.HTTP_400_BAD_REQUEST)
    # Validate image
    if avatar_file.size > 5 * 1024 * 1024:  # 5MB max
        return Response({'error': 'File too large (max 5MB)'}, status=status.HTTP_400_BAD_REQUEST)
    allowed_types = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    if avatar_file.content_type not in allowed_types:
        return Response({'error': 'Invalid file type'}, status=status.HTTP_400_BAD_REQUEST)
    # Delete old avatar if exists
    if profile.avatar:
        profile.avatar.delete(save=False)
    profile.avatar = avatar_file
    profile.save()
    serializer = UserProfileSerializer(profile, context={'request': request})
    return Response(serializer.data)