from django.urls import path, include
from rest_framework import routers

from lessons.views import LessonsViewSet, ExercisesViewSet

router = routers.SimpleRouter()
router.register(r'exercises', ExercisesViewSet, basename='Exercise')
router.register(r'', LessonsViewSet, basename='Lesson')

urlpatterns = [
    path('', include((router.urls, 'lessons'))),
]
