from rest_framework import serializers
from .models import DashboardItem, UserProfile


class DashboardItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = DashboardItem
        fields = ['id', 'title', 'value', 'created_at']


class UserProfileSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source='user.first_name', required=False, allow_blank=True)
    last_name = serializers.CharField(source='user.last_name', required=False, allow_blank=True)
    email = serializers.EmailField(source='user.email', required=False, allow_blank=True)
    username = serializers.CharField(source='user.username', read_only=True)
    avatar_url = serializers.SerializerMethodField()

    class Meta:
        model = UserProfile
        fields = [
            'username', 'first_name', 'last_name', 'email',
            'phone', 'bio', 'avatar', 'avatar_url',
            'country', 'city_state', 'postal_code', 'tax_id',
            'facebook_url', 'x_url', 'linkedin_url', 'instagram_url',
        ]
        read_only_fields = ['avatar']  # Avatar updated via separate endpoint

    def get_avatar_url(self, obj):
        if obj.avatar:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.avatar.url)
            return obj.avatar.url
        return None

    def update(self, instance, validated_data):
        user_fields = ['first_name', 'last_name', 'email']
        for attr in user_fields:
            if attr in validated_data:
                setattr(instance.user, attr, validated_data.pop(attr))
        instance.user.save()
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance