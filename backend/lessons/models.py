from django.contrib.auth import get_user_model
from django.db import models


class Lesson(models.Model):
    name = models.CharField(max_length=100)
    content = models.TextField()
    order = models.PositiveSmallIntegerField(unique=True)

    class Meta:
        ordering = ('order',)

    def __str__(self):
        return self.name


class Exercise(models.Model):
    user = models.ForeignKey(get_user_model(), related_name='exercises', on_delete=models.CASCADE)
    lesson = models.ForeignKey(Lesson, related_name='exercises', on_delete=models.CASCADE)
    points = models.FloatField()
    average_speed = models.PositiveSmallIntegerField()
    accuracy = models.FloatField()
    time_in_seconds = models.PositiveSmallIntegerField()
    created = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.user.username} - {self.lesson.name}'
