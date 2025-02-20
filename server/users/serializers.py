# users/serializers.py
from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()

class UserRegistrationSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'password', 'confirm_password', 'age', 'country']
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        confirm_password = validated_data.pop('confirm_password')  # Remove confirm_password from validated data

        # Create the user instance
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            password=validated_data['password'],
            age=validated_data['age'],
            country=validated_data['country'],
        )

        return user

    def validate(self, data):
        # Ensure the passwords match
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError({"confirm_password": "Passwords must match."})
        return data
