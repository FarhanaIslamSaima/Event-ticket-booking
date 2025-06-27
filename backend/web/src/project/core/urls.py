"""URL patterns for the core app."""

from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .api.views import UserViewSet

# Create a router and register our viewsets
router = DefaultRouter()
router.register(r"users", UserViewSet)

# URL patterns for the core app
urlpatterns = [
    path("", include(router.urls)),
    path("accounts/", include("allauth.urls")),
    path("venue/", include("project.event.urls"))
]
