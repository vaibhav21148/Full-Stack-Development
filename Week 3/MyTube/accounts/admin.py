from django.contrib import admin
from django.contrib.auth.models import User

# Optional customization for User model
class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email', 'is_active', 'is_staff']
    search_fields = ['username', 'email']
    ordering = ['username']
    fieldsets = (
        (None, {'fields': ('username', 'email', 'password')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser')}),
    )

admin.site.unregister(User)
admin.site.register(User, UserAdmin)
