from django.contrib import admin
from .models import Category, Venue, Event

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'is_active', 'created_at')
    search_fields = ('name', 'description')
    list_filter = ('is_active', 'created_at')
    ordering = ('-created_at',)

@admin.register(Venue)
class VenueAdmin(admin.ModelAdmin):
    list_display = ('name', 'city', 'state', 'country', 'capacity', 'is_active')
    search_fields = ('name', 'address', 'city', 'state')
    list_filter = ('city', 'state', 'country', 'is_active')
    ordering = ('name',)

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'event_date', 'venue', 'category', 'organizer', 'status')
    search_fields = ('title', 'description')
    list_filter = ('status', 'event_date', 'venue', 'category')
    ordering = ('-event_date',)
