from django.contrib import admin

# Register your models here.

from .models import Video, Comment
admin.site.register(Comment)
