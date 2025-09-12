from django.shortcuts import render
from rest_framework import generics,permissions
from rest_framework.response import Response
from .models import Event, Category, Venue, Order
from .serializers import EventSerializer, CategorySerializer, VenueSerializer, OrderSerializer


class VenueListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = VenueSerializer
    permission_classes = [permissions.AllowAny]
    def get_queryset(self):
        queryset = Venue.objects.all()
        
        # Active status filter
        id= self.request.query_params.get('id')
        if id is not None:
            try:
                queryset = queryset.filter(id=int(id))
            except ValueError:
                queryset = queryset.none()
                
        is_active = self.request.query_params.get('is_active')
        if is_active is not None:
            if is_active.lower() in ['true', '1']:
                queryset = queryset.filter(is_active=True)
            elif is_active.lower() in ['false', '0']:
                queryset = queryset.filter(is_active=False)
        
        # Capacity range presets
        capacity_range = self.request.query_params.get('capacity_range')
        if capacity_range == 'small':
            queryset = queryset.filter(capacity__lte=100)
        elif capacity_range == 'medium':
            queryset = queryset.filter(capacity__range=(101, 500))
        elif capacity_range == 'large':
            queryset = queryset.filter(capacity__range=(501, 1000))
        elif capacity_range == 'xlarge':
            queryset = queryset.filter(capacity__gt=1000)
        
        # Custom capacity range
        min_capacity = self.request.query_params.get('min_capacity')
        max_capacity = self.request.query_params.get('max_capacity')
        
        if min_capacity:
            try:
                queryset = queryset.filter(capacity__gte=int(min_capacity))
            except ValueError:
                pass  # Ignore invalid values
                
        if max_capacity:
            try:
                queryset = queryset.filter(capacity__lte=int(max_capacity))
            except ValueError:
                pass  # Ignore invalid values
        
        return queryset
    
    def list(self, request, *args, **kwargs):
        
        queryset = self.filter_queryset(self.get_queryset())
        
        # Get pagination parameters
        page = int(request.query_params.get('page', 1))
        limit = int(request.query_params.get('limit', 12))
        
        # Validate pagination parameters
        if page < 1:
            page = 1
        if limit < 1 or limit > 100:  # Max 100 items per page
            limit = 12
        
        # Calculate pagination
        total_count = queryset.count()
        start_index = (page - 1) * limit
        end_index = start_index + limit
        
        # Get paginated results
        paginated_queryset = queryset[start_index:end_index]
        serializer = self.get_serializer(paginated_queryset, many=True)
        
        return Response({
            'venues': serializer.data,
            'total': total_count,
            'page': page,
            'limit': limit,
        })


# Create your views here.
class EventListCreateAPIView(generics.ListCreateAPIView):

    def get_queryset(self):
        id= self.request.query_params.get('id')
        if id is not None:
            try:
                return Event.objects.filter(id=int(id))
            except ValueError:
                return Event.objects.none()
        queryset = Event.objects.all()
        
        # Filter by category
        category_id = self.request.query_params.get('category')
        if category_id is not None:
            try:
                queryset = queryset.filter(category__id=int(category_id))
            except ValueError:
                queryset = queryset.none()
        
        # Filter by venue
        venue_id = self.request.query_params.get('venue')
        if venue_id is not None:
            try:
                queryset = queryset.filter(venue__id=int(venue_id))
            except ValueError:
                queryset = queryset.none()
        
        # Date range filtering
        start_date = self.request.query_params.get('start_date')
        end_date = self.request.query_params.get('end_date')
        
        if start_date:
            queryset = queryset.filter(date__gte=start_date)
        if end_date:
            queryset = queryset.filter(date__lte=end_date)
        
        return queryset
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        # Automatically set the organizer to the current user
        serializer.save(organizer=self.request.user)

class CategoryListAPIView(generics.ListAPIView):
    queryset=Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]  


class OrderListCreateView(generics.ListCreateAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]  # user must be logged in

    def get_queryset(self):
        order_id = self.request.query_params.get('id')
        if order_id is not None:
            try:
                return Order.objects.filter(id=int(order_id), user=self.request.user)
            except ValueError:
                return Order.objects.none()
        # Return all orders of the current user by default
        return Order.objects.filter(user=self.request.user)