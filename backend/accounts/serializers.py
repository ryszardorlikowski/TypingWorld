from django.contrib.auth import get_user_model
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    """Main user model serializer"""
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        user = get_user_model().objects.create_user(**validated_data)
        return user

    class Meta:
        model = get_user_model()
        fields = ['username', 'password', 'email']
