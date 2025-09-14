# project/web/src/config/celery.py
import os
from celery import Celery

# Point to your custom settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

app = Celery('project')  # you can use your project name
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()
