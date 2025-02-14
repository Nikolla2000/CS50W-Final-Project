import json
from django.shortcuts import render
from rest_framework import generics
from .models import User
from .serializers import UserSerializer

from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators import require_POST

# Create your views here.
@require_POST
def login_view(request):
    data = json.loads(request.body)
    username = data.get("username")
    password = data.get("password")

    if username is None or password is None:
        return JsonResponse({ "message": "Please provide username and password" })
    
    user = authenticate(username=username, password=password)

    if user is None:
        return JsonResponse({ "message": "Invalid username or password" }, status=400)
    
    login(request, user)
    return JsonResponse({ "message": "Login successfull!" })


def logout_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({ "message": "You are not logged in" }, status=400)
    logout(request)
    return JsonResponse({ "message": "Successfully logged out!"})


@ensure_csrf_cookie
def session_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({ "isauthenticated": False })
    return JsonResponse({ "isauthenticated": True })


def get_username(request):
    if not request.user.is_authenticated:
        return JsonResponse({ "isauthenticated": False })
    return JsonResponse({ "username": request.user.username })