"""
Development settings for project
"""

from .base import *

DEBUG = True

ALLOWED_HOSTS = env.list('ALLOWED_HOSTS', '127.0.0.1')

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

INSTALLED_APPS += [
    'debug_toolbar',
]

MIDDLEWARE += ['debug_toolbar.middleware.DebugToolbarMiddleware', ]

INTERNAL_IPS = [
    '127.0.0.1',
]
CORS_ALLOWED_ORIGINS = env.list('CORS_ALLOWED_ORIGINS', 'http://127.0.0.1')
