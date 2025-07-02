from django.shortcuts import render, redirect
from .forms import RegisterForm
from django.contrib import messages
from django.contrib.auth.models import User
import uuid
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required

token_storage = {}  # simple in-memory token storage

def register_view(request):
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.is_active = False  # Deactivate until verification
            user.save()
            token = str(uuid.uuid4())
            token_storage[token] = user.username  # Simulate storing token
            return redirect(f'/verify/{token}')
    else:
        form = RegisterForm()
    return render(request, 'register.html', {'form': form})

from django.contrib.auth import get_user_model

def verify_view(request, token):
    username = token_storage.get(token)
    if not username:
        return render(request, 'verify.html', {'message': 'Invalid or expired token.'})

    User = get_user_model()
    try:
        user = User.objects.get(username=username)
        user.is_active = True
        user.save()
        del token_storage[token]  # Clean up after verification
        return render(request, 'verify.html', {'message': 'Account Verified Successfully!'})
    except User.DoesNotExist:
        return render(request, 'verify.html', {'message': 'User not found.'})

def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            if user.is_active:
                login(request, user)
                return redirect('dashboard')
            else:
                return render(request, 'login.html', {'error': 'Account not verified yet.'})
        else:
            return render(request, 'login.html', {'error': 'Invalid username or password.'})
    return render(request, 'login.html')

def logout_view(request):
    logout(request)
    return redirect('login')

@login_required(login_url='login')
def dashboard_view(request):
    return render(request, 'dashboard.html')

def home_view(request):
    return render(request, 'home.html')
