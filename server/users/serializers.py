from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'age', 'country', 'password']

    def validate_age(self, value):
        try:
            return int(value)
        except ValueError:
            raise serializers.ValidationError("Age must be a valid integer.")
