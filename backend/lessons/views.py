from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet
from rest_framework.permissions import IsAuthenticated
from lessons.serializers import LessonSerializer, ExerciseSerializer
from lessons.models import Lesson, Exercise


class LessonsViewSet(ReadOnlyModelViewSet):
    """List of all lessons"""
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer


class ExercisesViewSet(ModelViewSet):
    """List of user exercises"""
    serializer_class = ExerciseSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Exercise.objects.filter(user=self.request.user.id)
