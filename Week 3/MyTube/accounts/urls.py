from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register_view, name='register'),
    path('verify/<str:token>/', views.verify_view, name='verify'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('dashboard/', views.dashboard_view, name='dashboard'),
    path('', views.home_view, name='home'),
    
]