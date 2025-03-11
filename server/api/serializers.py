from rest_framework import serializers
from .models import Goal
from django.utils import timezone

class GoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Goal
        fields = ['id', 'user', 'description', 'start_date', 'deadline', 'is_completed']


    def validate_deadlite(self, value):
        if value < timezone.now():
            raise serializers.ValidationError("Deadling cannot be before today")
        return value