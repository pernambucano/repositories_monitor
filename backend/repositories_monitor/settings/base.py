# https://docs.djangoproject.com/en/1.10/ref/settings/

import os

from decouple import config  # noqa

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


def base_dir_join(*args):
    return os.path.join(BASE_DIR, *args)


SITE_ID = 1

SECURE_HSTS_PRELOAD = True

DEBUG = True

ADMINS = (
    ('Admin', 'demelofernandes.paulo@gmail.com'),
)

AUTH_USER_MODEL = 'users.User'

ALLOWED_HOSTS = []

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'django_js_reverse',
    'webpack_loader',
    'import_export',

    'common',
    'users',
    'repositories',
    'rest_framework',
    'rest_framework.authtoken',
    'corsheaders',

    'social_django',
    'rest_social_auth',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'repositories_monitor.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [base_dir_join('templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'common.context_processors.sentry_dsn',
                'common.context_processors.commit_sha',
            ],
        },
    },
]

WSGI_APPLICATION = 'repositories_monitor.wsgi.application'

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

STATICFILES_DIRS = (
    base_dir_join('../frontend'),
)

# Webpack
WEBPACK_LOADER = {
    'DEFAULT': {
        'CACHE': False,  # on DEBUG should be False
        'STATS_FILE': base_dir_join('../webpack-stats.json'),
        'POLL_INTERVAL': 0.1,
        'IGNORE': ['.+\.hot-update.js', '.+\.map']
    },
    'JQUERY': {
        'BUNDLE_DIR_NAME': 'bundles/',
        'STATS_FILE': base_dir_join('../jquery-webpack-stats.json'),
    }
}

# Celery
CELERY_ACCEPT_CONTENT = ['json']
CELERY_TASK_SERIALIZER = 'json'
CELERY_RESULT_SERIALIZER = 'json'
CELERY_ACKS_LATE = True

# Sentry
SENTRY_DSN = config('SENTRY_DSN', default='')
COMMIT_SHA = config('HEROKU_SLUG_COMMIT', default='')

# Rest Framework Settings
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.TokenAuthentication',
    )
}


AUTHENTICATION_BACKENDS = (
    'social_core.backends.github.GithubOAuth2',
   'django.contrib.auth.backends.ModelBackend',
)


SOCIAL_AUTH_GITHUB_KEY = config('SOCIAL_AUTH_GITHUB_KEY', default='')
SOCIAL_AUTH_GITHUB_SECRET = config('SOCIAL_AUTH_GITHUB_SECRET', default='')
SOCIAL_AUTH_GITHUB_SCOPE = ['email']


ACCOUNT_USER_MODEL_USERNAME_FIELD = None
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_USERNAME_REQUIRED = False
ACCOUNT_AUTHENTICATION_METHOD = 'email'

CORS_ORIGIN_WHITELIST = [
    'http://localhost:8000',
    'http://127.0.0.1:8000',
]
#
#CSRF_TRUSTED_ORIGINS = [
#    'http://localhost',
#    'http://127.0.0.1',
#]
