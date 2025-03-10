from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Goal
from .serializers import GoalSerializer
from users.models import User
# Create your views here.

class Goals(APIView):
    def get(self, request):
        user = User.objects.get(username="nuzo_admin")
        goals = Goal.objects.filter(user=user)

        serializer = GoalSerializer(goals)
        return Response({ "goals": serializer.data}, status=status.HTTP_200_OK)
    
    def post(self, request):
        user = User.objects.get(username=("nuzo_admin"))

        if not request.user.is_authenticated:
            return Response({ "message": "You must be signed in to use this feature" }, status=status.HTTP_401_UNAUTHORIZED)
        
        description = request.data.get("description")
        deadline = request.data.get("deadline")

        if not description or not deadline:
            return Response({ "message": "Description and deadline are required." },status=status.HTTP_400_BAD_REQUEST)

        new_goal = Goal.objects.create(
            user=user,
            description=description,
            deadline=deadline
        )

        serializer = GoalSerializer(new_goal)

        return Response({ "message": "Goal added successfully", "goal": serializer.data}, status=status.HTTP_201_CREATED )