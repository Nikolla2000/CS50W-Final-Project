# import json

# from django.contrib.auth import authenticate, login, logout
# from django.http import JsonResponse
# from django.middleware.csrf import get_token
# from django.views.decorators.csrf import ensure_csrf_cookie
# from django.views.decorators.http import require_POST

# from rest_framework import status
# from rest_framework.response import Response
# from rest_framework.views import APIView
# from .serializers import UserRegistrationSerializer


# def get_csrf(request):
#     response = JsonResponse({ 'message': 'CSRF cookie set' })
#     response['X-CSRFToken'] = get_token(request)
#     return response


# @require_POST
# def login_view(request):
#     data = json.loads(request.body)
#     username = data.get('username')
#     password = data.get('password')

#     if username is None or password is None:
#         return JsonResponse({'message': 'Please provide username and password.'}, status=400)

#     user = authenticate(username=username, password=password)

#     if user is None:
#         return JsonResponse({'message': 'Invalid username or password.'}, status=400)

#     login(request, user)
#     return JsonResponse({'message': 'Successfully logged in.'})


# def logout_view(request):
#     if not request.user.is_authenticated:
#         return JsonResponse({'message': 'You\'re not logged in.'}, status=400)

#     logout(request)
#     return JsonResponse({'message': 'Successfully logged out.'})


# @ensure_csrf_cookie
# def session_view(request):
#     if not request.user.is_authenticated:
#         return JsonResponse({'isAuthenticated': False})

#     return JsonResponse({'isAuthenticated': True})


# def whoami_view(request):
#     if not request.user.is_authenticated:
#         return JsonResponse({'isAuthenticated': False})

#     return JsonResponse({'username': request.user.username, 'first_name': request.user.first_name})


# class RegisterUserView(APIView):
#     def post(self, request):
#         serializer = UserRegistrationSerializer(data=request.data)

#         if serializer.is_valid():
#             user = serializer.save()
#             return Response({ "message": "User registered successfuly", "user": serializer.data },
#                             status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

class UserView(APIView):
     
   permission_classes = (IsAuthenticated, )
   def get(self, request):
     #   content = {'message': 'Welcome to the JWT Authentication page using React Js and Django!'}
     if not request.user.is_authenticated:
         return Response({'isAuthenticated': False})

     return Response({'username': request.user.username, 'first_name': request.user.first_name})
   

class LogoutView(APIView):
     permission_classes = (IsAuthenticated,)
     def post(self, request):
          
          try:
               refresh_token = request.data["refresh_token"]
               token = RefreshToken(refresh_token)
               token.blacklist()
               return Response({ "message": "Logout sucessfull, token blacklisted" },status=status.HTTP_205_RESET_CONTENT)
          except Exception as e:
               return Response(status=status.HTTP_400_BAD_REQUEST)