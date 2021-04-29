from django.contrib.auth import get_user_model
from rest_framework.generics import CreateAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from accounts.serializers import UserSerializer


class CreateUserAPIView(CreateAPIView):
    """Register user API view"""
    model = get_user_model()
    serializer_class = UserSerializer


class UserProfileAPIView(RetrieveAPIView):
    """Return user profile"""
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated, )

    def get_object(self):
        return get_user_model().objects.get(pk=self.request.user.pk)
