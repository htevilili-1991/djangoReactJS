from rest_framework import serializers
from .models import DashboardItem

class DashboardItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = DashboardItem
        fields = ['id', 'title', 'value', 'created_at']