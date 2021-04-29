from django.test import TestCase
from django.contrib.auth import get_user_model

class UserTestModel(TestCase):
    """
    Klasa testująca model użytkownika
    """

    def test_create_user(self):
        user = get_user_model().objects.create_user(
            username='test_user',
            email='test@test.com',
            password='test'
        )
        self.assertTrue(isinstance(user, get_user_model()))
        self.assertFalse(user.is_active)
        self.assertTrue(user.is_staff)

    def test_create_superuser(self):
        admin_user = get_user_model().objects.create_superuser(
            username='admin',
            email='admin@admin.com',
            password='admin'
        )
        self.assertTrue(admin_user.is_staff)
        self.assertTrue(admin_user.is_superuser)
