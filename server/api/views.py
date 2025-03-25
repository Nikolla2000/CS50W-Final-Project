from datetime import datetime
from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from .models import Goal
from .serializers import GoalSerializer

class Goals(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        goals = Goal.objects.filter(user=request.user)
        serializer = GoalSerializer(goals, many=True)
        return Response({"goals": serializer.data}, status=status.HTTP_200_OK)
    
    def post(self, request):   
        description = request.data.get("description")
        deadline_str = request.data.get("deadline")

        if not description or not deadline_str:
            return Response({"message": "Description and deadline are required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            deadline = datetime.fromisoformat(deadline_str)
        except ValueError:
            return Response({"message": "Invalid deadline format."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            deadline = timezone.make_aware(deadline)
        except Exception as e:
            return Response({"message": f"Error making the deadline timezone aware: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            new_goal = Goal.objects.create(
                user=request.user,
                description=description,
                deadline=deadline
            )
        except Exception as e:
            return Response({"message": f"An error occurred while creating the goal: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        serializer = GoalSerializer(new_goal)
        return Response({"message": "Goal added successfully", "goal": serializer.data}, status=status.HTTP_201_CREATED)
    

    def patch(self, request, goal_id):    
        try:
            goal = Goal.objects.get(id=goal_id, user=request.user)
        except Goal.DoesNotExist:
            return Response({"message": "Goal not found"}, status=status.HTTP_404_NOT_FOUND)
        
        goal.is_completed = True
        goal.save()

        serializer = GoalSerializer(goal)
        return Response({"message": "Goal marked as completed", "goal": serializer.data}, status=status.HTTP_200_OK)
        

