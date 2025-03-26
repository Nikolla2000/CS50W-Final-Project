from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from .models import Task
from .serializers import TaskSerializer
from django.utils import timezone

class Tasks(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        tasks = Task.objects.filter(user=request.user)
        serializer = TaskSerializer(tasks, many=True)

        return Response({ "tasks": serializer.data}, status=status.HTTP_200_OK )
    
    def post(self, request):
        description = request.data.get("description")

        if not description:
            return Response({ "message": "Description is required" }, status=status.HTTP_400_BAD_REQUEST)

        try:
            new_task = Task.objects.create(
                user=request.user,
                description=description,
                date=timezone.now().date()
            )
        except Exception as e:
            return Response({"message": f"An error occurred while creating the task: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        serializer = TaskSerializer(new_task)
        return Response({"message": "Task added successfully", "task": serializer.data}, status=status.HTTP_201_CREATED)
