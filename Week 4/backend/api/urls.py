from django.urls import path
from .views import (
    RegisterView,
    CustomAuthToken,
    VideoUploadView,
    VideoListView,
    VideoDetailView,
    UserVideoListView,
    toggle_watch_later,
    toggle_like,
    video_comments,
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', CustomAuthToken.as_view(), name='login'),
    
    # ✅ CHANGED to match frontend
    path('videos/upload/', VideoUploadView.as_view(), name='upload-video'),

    path('videos/', VideoListView.as_view(), name='video-list'),
    path('videos/<int:pk>/', VideoDetailView.as_view(), name='video-detail'),
    path('my-videos/', UserVideoListView.as_view(), name='my-videos'),
    path('videos/<int:pk>/toggle-watch-later/', toggle_watch_later, name='toggle-watch-later'),
    path('videos/<int:pk>/toggle-like/', toggle_like, name='toggle-like'),
    path('videos/<int:pk>/comments/', video_comments, name='video-comments'),
]
