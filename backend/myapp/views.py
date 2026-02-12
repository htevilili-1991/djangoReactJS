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
    return Response({
        'token': token.key,
        'user': {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'is_staff': user.is_staff,
            'is_superuser': user.is_superuser,
        }
    })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_user(request):
    """Get current authenticated user."""
    user = request.user
    return Response({
        'user': {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'is_staff': user.is_staff,
            'is_superuser': user.is_superuser,
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