from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from accounts.views import CreateUserAPIView, UserProfileAPIView

urlpatterns = [
    path('login', jwt_views.TokenObtainPairView.as_view(), name="token-obtain-pair"),
    path('login/refresh', jwt_views.TokenRefreshView.as_view(), name="token-refresh"),
    path('register', CreateUserAPIView.as_view(), name="register"),
    path('profile', UserProfileAPIView.as_view(), name="profile"),
]
