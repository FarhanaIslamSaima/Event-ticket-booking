# project/event/management/commands/cleanup_pending_orders.py
from django.core.management.base import BaseCommand
from django.utils import timezone
from project.event.models import Order
from datetime import timedelta

class Command(BaseCommand):
    help = "Delete pending orders older than X minutes and restore tickets"

    def handle(self, *args, **kwargs):
        threshold = timezone.now() - timedelta(minutes=30)  # e.g., 30 mins
        old_orders = Order.objects.filter(status="due", created_at__lt=threshold)

        for order in old_orders:
            event = order.event
            event.total_tickets += order.tickets  # restore tickets
            event.save()
            order.delete()
            self.stdout.write(f"Deleted order {order.id} and restored {order.tickets} tickets to event '{event.name}'")
