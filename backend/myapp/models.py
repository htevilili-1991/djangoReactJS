from django.db import models
from django.conf import settings


class DashboardItem(models.Model):
    title = models.CharField(max_length=100)
    value = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class UserProfile(models.Model):
    """Extended profile for User - phone, bio, avatar, address, social links."""
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='profile')
    phone = models.CharField(max_length=30, blank=True)
    bio = models.CharField(max_length=255, blank=True)
    avatar = models.ImageField(upload_to='avatars/%Y/%m/', blank=True, null=True)
    # Address
    country = models.CharField(max_length=100, blank=True)
    city_state = models.CharField(max_length=200, blank=True)
    postal_code = models.CharField(max_length=20, blank=True)
    tax_id = models.CharField(max_length=50, blank=True)
    # Social links
    facebook_url = models.URLField(blank=True)
    x_url = models.URLField(blank=True)
    linkedin_url = models.URLField(blank=True)
    instagram_url = models.URLField(blank=True)

    def __str__(self):
        return f"{self.user.username}'s profile"