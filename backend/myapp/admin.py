from django.contrib import admin
from .models import DashboardItem, UserProfile

admin.site.register(DashboardItem)


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'phone', 'country', 'city_state']
    search_fields = ['user__username', 'user__email', 'phone', 'country']