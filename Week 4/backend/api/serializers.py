from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Video, Comment

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email'),
            password=validated_data['password']
        )
        return user

class VideoSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    is_in_watch_later = serializers.SerializerMethodField()

    class Meta:
        model = Video
        fields = ['id', 'user', 'title', 'description', 'video_file', 'uploaded_at', 'is_in_watch_later', 'like_count', 'is_liked']

    def get_is_in_watch_later(self, obj):
        user = self.context.get('request').user
        if user.is_authenticated:
            return obj.watch_later_by.filter(id=user.id).exists()
        return False
    
    like_count = serializers.SerializerMethodField()
    is_liked = serializers.SerializerMethodField()

    def get_like_count(self, obj):
        return obj.liked_by.count()

    def get_is_liked(self, obj):
        user = self.context.get('request').user
        return user.is_authenticated and obj.liked_by.filter(id=user.id).exists()

class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'user', 'text', 'created_at']
