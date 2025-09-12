from django.contrib import admin
from .models import Category, Order, Venue, Event

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

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'event', 'number_of_tickets', 'total_amount', 'created_at')
    list_filter = ('event', 'created_at', 'user')
    search_fields = ('user__username', 'event__title', 'user__email')
    readonly_fields = ('created_at', 'total_amount')