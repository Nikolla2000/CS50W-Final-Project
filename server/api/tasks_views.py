from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.parsers import JSONParser

from .models import Task
from .serializers import TaskSerializer
from django.utils import timezone
from django.db import IntegrityError

class Tasks(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        date_str = request.query_params.get("date")

        if date_str:
            try:
                 date = timezone.datetime.strptime(date_str, "%Y-%m-%d").date()
            except ValueError:
                return Response({"message": "Invalid date format. Use YYYY-MM-DD."}, status=status.HTTP_400_BAD_REQUEST)
            
        tasks = Task.objects.filter(user=request.user, date=date)
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
    
class TaskDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, task_id, user):
        try:
            return Task.objects.get(id=task_id, user=user)
        except Task.DoesNotExist:
            return None

    def get(self, request, task_id):
        task = self.get_object(task_id, request.user)

        if not task:
            return Response({ "message": "Task not found" }, status=status.HTTP_404_NOT_FOUND)
        serialier = TaskSerializer(task)
        return Response({ "task": serialier.data }, status=status.HTTP_200_OK)
    

    def patch(self, request, task_id):
        task = self.get_object(task_id, request.user)

        if not task:
            return Response({ "message": "Task not found" }, status=status.HTTP_404_NOT_FOUND)
        
        task.is_completed = True
        task.save()

        serializer = TaskSerializer(task)
        return Response(
            {"message": "Task marked as completed", "task": serializer.data}, status=status.HTTP_200_OK)
    

    def put(self, request, task_id):
        task = self.get_object(task_id, request.user)

        if not task:
            return Response({ "message": "Task not found" }, status=status.HTTP_404_NOT_FOUND)
        
        try:
            data = JSONParser().parse(request)
            description = data.get("description", task.description)
            is_completed = task.is_completed
            date = task.date

            task.description = description
            task.is_completed = is_completed
            task.date = date
            task.save()

            serializer = TaskSerializer(task)
            return Response({"message": "Task updated successfully", "task": serializer.data}, status=status.HTTP_200_OK)
        except IntegrityError:
            return Response({"message": "Database integrity error occurred"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            return Response({"message": f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



    def delete(self, request, task_id):
        task = self.get_object(task_id, request.user)

        if not task:
            return Response({ "message": "Task not found" }, status=status.HTTP_404_NOT_FOUND)
        
        task.delete()
        return Response({"message": "Task deleted successfully"}, status=status.HTTP_204_NO_CONTENT)


