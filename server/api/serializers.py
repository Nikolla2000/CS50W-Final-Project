from rest_framework import serializers
from .models import Goal, Task
from django.utils import timezone
from .models import FocusTimerRecord
from isodate import parse_duration
from datetime import timedelta
# from ..users.models import User

# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['id', 'username', 'email']

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
        

# serializers.py
from django.utils.dateparse import parse_duration  # Use Django's built-in parser
from rest_framework import serializers

class FocusTimerRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = FocusTimerRecord
        fields = ['id', 'user', 'duration']
        read_only_fields = ['id', 'user']

    def validate_duration(self, value):
        """Convert ISO duration string to timedelta using Django's parser"""
        if isinstance(value, str):
            try:
                return parse_duration(value)
            except (ValueError, TypeError):
                raise serializers.ValidationError(
                    "Duration must be in ISO 8601 format (e.g., PT1H30M15S)"
                )
        return value 