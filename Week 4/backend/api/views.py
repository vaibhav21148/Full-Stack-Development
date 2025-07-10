from django.shortcuts import render

# Create your views here.

from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.parsers import MultiPartParser, FormParser

from .models import Video
from .serializers import RegisterSerializer, VideoSerializer, UserSerializer
from rest_framework import permissions
from rest_framework.generics import ListAPIView
from .models import Video
from .serializers import VideoSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .models import Comment
from .serializers import CommentSerializer
from django.db.models import Q


# Register user
class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

# Custom login view (token-based)
class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, _ = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user': UserSerializer(user).data
        })

# Upload video
class VideoUploadView(generics.CreateAPIView):
    serializer_class = VideoSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# List all videos
class VideoListView(generics.ListAPIView):
    queryset = Video.objects.all().order_by('-uploaded_at')
    serializer_class = VideoSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        query = self.request.query_params.get('search', '')
        return Video.objects.filter(
            Q(title__icontains=query) | Q(description__icontains=query)
        ).order_by('-uploaded_at')

# Get single video
class VideoDetailView(generics.RetrieveAPIView):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer
    permission_classes = [permissions.AllowAny]

class UserVideoListView(ListAPIView):
    serializer_class = VideoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Video.objects.filter(user=self.request.user).order_by('-uploaded_at')
    
@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def toggle_watch_later(request, pk):
    try:
        video = Video.objects.get(pk=pk)
    except Video.DoesNotExist:
        return Response({'error': 'Video not found'}, status=status.HTTP_404_NOT_FOUND)

    user = request.user
    if user in video.watch_later_by.all():
        video.watch_later_by.remove(user)
        return Response({'message': 'Removed from watch later'})
    else:
        video.watch_later_by.add(user)
        return Response({'message': 'Added to watch later'})

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def toggle_like(request, pk):
    try:
        video = Video.objects.get(pk=pk)
    except Video.DoesNotExist:
        return Response({'error': 'Video not found'}, status=status.HTTP_404_NOT_FOUND)

    user = request.user
    if user in video.liked_by.all():
        video.liked_by.remove(user)
        return Response({'message': 'Like removed'})
    else:
        video.liked_by.add(user)
        return Response({'message': 'Liked'})

@api_view(['GET', 'POST'])
@permission_classes([permissions.IsAuthenticatedOrReadOnly])
def video_comments(request, pk):
    if request.method == 'GET':
        comments = Comment.objects.filter(video_id=pk).order_by('-created_at')
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        text = request.data.get('text')
        if not text:
            return Response({'error': 'Comment text required'}, status=400)

        comment = Comment.objects.create(
            video_id=pk,
            user=request.user,
            text=text
        )
        return Response(CommentSerializer(comment).data, status=201)
    