import uuid
from rest_framework import serializers
from project.event.models import Event, Category, Venue, Order
from django.db import transaction
from django.contrib.auth import get_user_model

User = get_user_model()



class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
class VenueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Venue
        fields = '__all__'

class EventSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    def get_image_url(self, obj):
        if obj.image:
            return obj.image.url
        return None

    category = CategorySerializer(read_only=True)
    venue = VenueSerializer(read_only=True)

    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), source='category', write_only=True
    )
    venue_id = serializers.PrimaryKeyRelatedField(
        queryset=Venue.objects.all(), source='venue', write_only=True
    )

    class Meta:
        model = Event
        fields = [
            'id', 'title', 'description', 'event_date', 'end_date',
            'total_tickets', 'available_tickets', 'base_price', 'status',
            'terms_conditions', 'image_url', 'created_at', 'updated_at',
            'venue', 'category', 'category_id', 'venue_id', 'image',
            'organizer', 'organizer_id'
        ]
        read_only_fields = ['organizer', 'category', 'venue', 'created_at', 'updated_at']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']  # Add more fields if you want

class OrderSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)       # nested user info
    event = EventSerializer(read_only=True)     # nested event info
    event_id = serializers.PrimaryKeyRelatedField(
        queryset=Event.objects.all(), source='event', write_only=True
    )

    class Meta:
        model = Order
        fields = [
            'id',
            'user',
            'event',
            'event_id',
            'number_of_tickets',
            'total_amount',
            'status',      # ✅ added status field
            'tran_id',     # ✅ added tran_id field
            'created_at'
        ]
        read_only_fields = ['created_at', 'total_amount', 'user', 'event', 'status', 'tran_id']

    def create(self, validated_data):
        user = self.context['request'].user
        event = validated_data['event']
        number_of_tickets = validated_data['number_of_tickets']
       

        validated_data['user'] = user
        validated_data['total_amount'] = number_of_tickets * event.base_price
        validated_data['status'] = 'due'          # ✅ set default status to due
        validated_data['tran_id'] = str(uuid.uuid4()) 
                # ✅ Ensure both order creation and ticket reduction happen atomically
        with transaction.atomic():
            # First create the order
            order = super().create(validated_data)

            # Then reduce tickets (after order is successfully saved)
            if event.total_tickets < number_of_tickets:
                raise serializers.ValidationError(
                    {"detail": "Not enough tickets available for this event."}
                )

            event.total_tickets -= number_of_tickets
            event.save(update_fields=['total_tickets'])

        return order # ✅ generate unique transaction id
