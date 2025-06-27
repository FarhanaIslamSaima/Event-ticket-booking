# urls.py
from django.urls import path
from .views import VenueListCreateAPIView

urlpatterns = [
     path('venues/', VenueListCreateAPIView.as_view(), name='venue-list-create'),
    
]
