# urls.py
from django.urls import path
from .views import VenueCreateAPIView

urlpatterns = [
    path('create/', VenueCreateAPIView.as_view(), name='api-venue-create'),
    
]
