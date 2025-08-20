from django.shortcuts import render

def index(request):
    return render(request, 'index.html')

# Add the API viewset below
from rest_framework import viewsets
from .models import DashboardItem
from .serializers import DashboardItemSerializer

class DashboardItemViewSet(viewsets.ModelViewSet):
    queryset = DashboardItem.objects.all()
    serializer_class = DashboardItemSerializer