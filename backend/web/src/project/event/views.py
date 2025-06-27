from django.shortcuts import render
from rest_framework import generics
from .models import Event, Category, Venue
from .serializers import EventSerializer, CategorySerializer, VenueSerializer


class VenueCreateAPIView(generics.CreateAPIView):
    queryset = Venue.objects.all()
    serializer_class = VenueSerializer
    

# Create your views here.
class EventCreateAPIView(generics.CreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer