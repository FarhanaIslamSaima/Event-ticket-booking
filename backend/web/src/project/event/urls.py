# urls.py
from django.urls import path
from .views import FeaturedEventsView, OrderListCreateView, VenueListCreateAPIView,CategoryListAPIView,EventListCreateAPIView

urlpatterns = [
     path('venues/', VenueListCreateAPIView.as_view(), name='venue-list-create'),
     path('categories/',CategoryListAPIView.as_view(),name='category_list_view'),
     path('events/', EventListCreateAPIView.as_view(), name='event_list_create_view'),
     path('orders/', OrderListCreateView.as_view(), name='create-order'),
     path('featured-events/', FeaturedEventsView.as_view(), name='featured-events'),
    
]
