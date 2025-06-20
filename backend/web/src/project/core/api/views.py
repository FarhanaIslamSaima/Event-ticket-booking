"""API views for the core app."""

from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser

from .serializers import UserSerializer


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint that allows users to be viewed."""

    queryset = User.objects.all().order_by("-date_joined")
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]
    filterset_fields = ["username", "email"]
    search_fields = ["username", "email", "first_name", "last_name"]
    ordering_fields = ["username", "date_joined"]
