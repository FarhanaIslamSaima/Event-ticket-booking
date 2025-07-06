from rest_framework import serializers
from project.event.models import Event, Category, Venue





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
