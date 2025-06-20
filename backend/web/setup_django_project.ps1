# Windows PowerShell script to create a modern Django project with Django REST Framework and best practices

# Step 1: Create project directory
New-Item -Path "django_drf_project" -ItemType Directory -Force
Set-Location -Path "django_drf_project"

# Step 2: Set up virtual environment using uv (the modern Python package manager)
Write-Output "Setting up virtual environment using uv..."
python -m pip install --upgrade uv
uv venv .venv
& .\.venv\Scripts\Activate.ps1

# Step 3: Install dependencies with uv
Write-Output "Installing dependencies..."
uv pip install django djangorestframework django-cors-headers django-filter drf-spectacular python-dotenv "psycopg[binary]" gunicorn

# Step 4: Install development dependencies
Write-Output "Installing development tools..."
uv pip install pre-commit black isort flake8 mypy pytest pytest-django

# Step 5: Create Django project
Write-Output "Creating Django project..."
django-admin startproject config .

# Step 6: Create a core app for common functionality
Write-Output "Creating core app..."
python manage.py startapp core

# Step 7: Set up basic project structure
New-Item -Path "media", "static", "logs" -ItemType Directory -Force

# Step 8: Create a basic requirements file
@"
# Generated with: uv pip freeze
django>=5.0.0
djangorestframework>=3.15.0
django-cors-headers>=4.3.0
django-filter>=24.0
drf-spectacular>=0.27.0
python-dotenv>=1.0.0
psycopg[binary]>=3.1.12
gunicorn>=21.2.0
"@ | Out-File -FilePath "requirements.txt" -Encoding utf8

# Create a dev requirements file
@"
-r requirements.txt
pre-commit>=3.5.0
black>=24.0.0
isort>=5.13.0
flake8>=7.0.0
mypy>=1.8.0
pytest>=7.4.0
pytest-django>=4.7.0
"@ | Out-File -FilePath "requirements-dev.txt" -Encoding utf8

# Step 9: Set up pre-commit configuration
@"
repos:
-   repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.5.0
    hooks:
    -   id: trailing-whitespace
    -   id: end-of-file-fixer
    -   id: check-yaml
    -   id: check-added-large-files

-   repo: https://github.com/pycqa/isort
    rev: 5.13.2
    hooks:
    -   id: isort

-   repo: https://github.com/psf/black
    rev: 24.2.0
    hooks:
    -   id: black

-   repo: https://github.com/pycqa/flake8
    rev: 7.0.0
    hooks:
    -   id: flake8
"@ | Out-File -FilePath ".pre-commit-config.yaml" -Encoding utf8

# Step 10: Create pyproject.toml for tool configuration
@"
[tool.black]
line-length = 88
target-version = ['py310']
include = '\.pyi?$'

[tool.isort]
profile = "black"
line_length = 88

[tool.mypy]
python_version = "3.10"
disallow_untyped_defs = true
disallow_incomplete_defs = true
check_untyped_defs = true
disallow_untyped_decorators = true
no_implicit_optional = true
strict_optional = true
warn_redundant_casts = true
warn_no_return = true
warn_return_any = true

[tool.pytest.ini_options]
DJANGO_SETTINGS_MODULE = "config.settings"
python_files = "test_*.py"
testpaths = ["tests"]
"@ | Out-File -FilePath "pyproject.toml" -Encoding utf8

# Step 11: Update settings.py with DRF and other configurations
@"
"""
Django settings for config project.
"""
import os
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Build paths inside the project
BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv('SECRET_KEY', 'django-insecure-key-for-development-only')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.getenv('DEBUG', 'False') == 'True'

ALLOWED_HOSTS = os.getenv('ALLOWED_HOSTS', 'localhost,127.0.0.1').split(',')

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Third-party apps
    'rest_framework',
    'corsheaders',
    'django_filters',
    'drf_spectacular',

    # Local apps
    'core',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'

# Database
DATABASES = {
    'default': {
        'ENGINE': os.getenv('DB_ENGINE', 'django.db.backends.sqlite3'),
        'NAME': os.getenv('DB_NAME', str(BASE_DIR / 'db.sqlite3')),
        'USER': os.getenv('DB_USER', ''),
        'PASSWORD': os.getenv('DB_PASSWORD', ''),
        'HOST': os.getenv('DB_HOST', ''),
        'PORT': os.getenv('DB_PORT', ''),
    }
}

# Password validation
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

# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
STATIC_URL = 'static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_DIRS = [BASE_DIR / 'static']

# Media files
MEDIA_URL = 'media/'
MEDIA_ROOT = BASE_DIR / 'media'

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# REST Framework settings
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
    'DEFAULT_FILTER_BACKENDS': [
        'django_filters.rest_framework.DjangoFilterBackend',
        'rest_framework.filters.SearchFilter',
        'rest_framework.filters.OrderingFilter',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10,
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
}

# CORS settings
CORS_ALLOWED_ORIGINS = os.getenv('CORS_ALLOWED_ORIGINS', 'http://localhost:3000,http://127.0.0.1:3000').split(',')
CORS_ALLOW_CREDENTIALS = True

# DRF Spectacular settings
SPECTACULAR_SETTINGS = {
    'TITLE': 'API Documentation',
    'DESCRIPTION': 'API documentation for our Django REST Framework project',
    'VERSION': '1.0.0',
    'SERVE_INCLUDE_SCHEMA': False,
}

# Logging configuration
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '{levelname} {asctime} {module} {message}',
            'style': '{',
        },
    },
    'handlers': {
        'file': {
            'level': 'INFO',
            'class': 'logging.FileHandler',
            'filename': BASE_DIR / 'logs/django.log',
            'formatter': 'verbose',
        },
        'console': {
            'level': 'INFO',
            'class': 'logging.StreamHandler',
            'formatter': 'verbose',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['file', 'console'],
            'level': 'INFO',
            'propagate': True,
        },
    },
}
"@ | Out-File -FilePath "config\settings.py" -Encoding utf8 -Force

# Step 12: Update URLs configuration
@"
"""URL configuration for the project."""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView,
    SpectacularRedocView,
)

urlpatterns = [
    path('admin/', admin.site.urls),

    # API Schema documentation
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/schema/swagger-ui/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/schema/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),

    # Include app URLs
    path('api/v1/', include('core.urls')),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
"@ | Out-File -FilePath "config\urls.py" -Encoding utf8 -Force

# Step 13: Create a basic core app structure
New-Item -Path "core\api" -ItemType Directory -Force

# Create __init__.py files
New-Item -Path "core\api\__init__.py" -ItemType File -Force

# Create serializers.py for DRF
@"
"""Serializers for the core app."""
from rest_framework import serializers
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    """Serializer for the User model."""

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']
        read_only_fields = ['id']
"@ | Out-File -FilePath "core\api\serializers.py" -Encoding utf8

# Create views.py for DRF
@"
"""API views for the core app."""
from rest_framework import viewsets
from django.contrib.auth.models import User
from .serializers import UserSerializer
from rest_framework.permissions import IsAdminUser


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint that allows users to be viewed."""

    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]
    filterset_fields = ['username', 'email']
    search_fields = ['username', 'email', 'first_name', 'last_name']
    ordering_fields = ['username', 'date_joined']
"@ | Out-File -FilePath "core\api\views.py" -Encoding utf8

# Create core/urls.py
@"
"""URL patterns for the core app."""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api.views import UserViewSet

# Create a router and register our viewsets
router = DefaultRouter()
router.register(r'users', UserViewSet)

# URL patterns for the core app
urlpatterns = [
    path('', include(router.urls)),
]
"@ | Out-File -FilePath "core\urls.py" -Encoding utf8

# Create a sample .env file
@"
# Django settings
DEBUG=True
SECRET_KEY=your-secret-key-here
ALLOWED_HOSTS=localhost,127.0.0.1

# Database settings (PostgreSQL)
# DB_ENGINE=django.db.backends.postgresql
# DB_NAME=django_drf_db
# DB_USER=postgres
# DB_PASSWORD=password
# DB_HOST=localhost
# DB_PORT=5432

# CORS settings
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
"@ | Out-File -FilePath ".env.example" -Encoding utf8

# Create .gitignore file
@"
# Byte-compiled / optimized / DLL files
__pycache__/
*.py[cod]
*$py.class

# Virtual environments
.env
.venv
env/
venv/
ENV/

# Database
db.sqlite3
db.sqlite3-journal

# Logs
logs/
*.log

# Static files
staticfiles/

# Media files
media/

# Unit test / coverage reports
htmlcov/
.tox/
.coverage
.coverage.*
.cache
nosetests.xml
coverage.xml
*.cover
.hypothesis/
.pytest_cache/

# Django stuff
local_settings.py

# IDE specific files
.idea/
.vscode/
*.swp
*.swo

# OS specific files
.DS_Store
Thumbs.db
"@ | Out-File -FilePath ".gitignore" -Encoding utf8

# Initialize the default directory for tests
New-Item -Path "tests" -ItemType Directory -Force
New-Item -Path "tests\__init__.py" -ItemType File -Force

@"
"""Sample test to verify pytest setup."""
import pytest


def test_sample():
    """Sample test function."""
    assert True
"@ | Out-File -FilePath "tests\test_sample.py" -Encoding utf8

# Create a README.md file
@"
# Django REST Framework Project

A modern Django REST Framework project with best practices.

## Features

- Django 5.0+
- Django REST Framework 3.15+
- PostgreSQL support (configurable)
- API documentation with drf-spectacular (Swagger/OpenAPI)
- Authentication system
- Environment variables with python-dotenv
- Development tools: Black, isort, flake8, mypy, pytest
- Pre-commit hooks
- Comprehensive logging
- CORS configuration

## Setup Instructions

### 1. Clone the repository

```powershell
git clone <repository-url>
cd django_drf_project
```

### 2. Set up the environment

```powershell
# Create a virtual environment using uv
python -m pip install --upgrade uv
uv venv .venv
.\.venv\Scripts\Activate.ps1

# Install dependencies
uv pip install -r requirements.txt
uv pip install -r requirements-dev.txt
```

### 3. Configure environment variables

```powershell
# Copy the example environment file and adjust as needed
Copy-Item .env.example .env
```

### 4. Set up the database

```powershell
# Apply migrations
python manage.py migrate

# Create a superuser
python manage.py createsuperuser
```

### 5. Set up pre-commit hooks

```powershell
pre-commit install
```

### 6. Run the development server

```powershell
python manage.py runserver
```

## API Documentation

Once the server is running, you can access the API documentation at:

- Swagger UI: http://localhost:8000/api/schema/swagger-ui/
- ReDoc: http://localhost:8000/api/schema/redoc/

## Testing

```powershell
# Run tests
pytest

# Check code style
black . --check
isort . --check
flake8
```

## Deployment

This project can be deployed using various methods including:

- Docker/Docker Compose
- Gunicorn with Nginx
- PaaS services like Heroku, Render, etc.

For production deployment, be sure to set appropriate environment variables and security settings.
"@ | Out-File -FilePath "README.md" -Encoding utf8

Write-Output "Setup complete! Your Django REST Framework project is ready."
Write-Output "Next steps:"
Write-Output "1. Activate the virtual environment: .\.venv\Scripts\Activate.ps1"
Write-Output "2. Copy .env.example to .env and configure your environment variables: Copy-Item .env.example .env"
Write-Output "3. Run migrations: python manage.py migrate"
Write-Output "4. Create a superuser: python manage.py createsuperuser"
Write-Output "5. Start the development server: python manage.py runserver"
