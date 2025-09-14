# project/event/tasks.py
from celery import shared_task
from django.utils import timezone
from datetime import timedelta
from project.event.models import Order

@shared_task
def cleanup_pending_orders():
    threshold = timezone.now() - timedelta(minutes=5)
    old_orders = Order.objects.filter(status="due", created_at__lt=threshold)

    deleted_count = 0
    for order in old_orders:
        event = order.event
        event.total_tickets += order.number_of_tickets
        event.save()
        order.delete()
        deleted_count += 1

    return f"Deleted {deleted_count} pending orders."
