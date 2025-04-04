from rest_framework import serializers
from .models import Goal, Task
from django.utils import timezone
from .models import FocusTimerRecord
from ..users.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class GoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Goal
        fields = ['id', 'user', 'description', 'start_date', 'deadline', 'is_completed']


    def validate_deadline(self, value):
        if value < timezone.now():
            raise serializers.ValidationError("Deadline cannot be before today")
        return value


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'user', 'description', 'date', 'is_completed']

        def validate_date(self, value):
            if value < timezone.now().date():
                raise serializers.ValidationError("Task date cannot be in the past.")
            return value
        

class FocusTimerRecordSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = FocusTimerRecord
        fields = ['id', 'user', 'duration']
