# events/documents.py
from django_elasticsearch_dsl import Document
from django_elasticsearch_dsl.registries import registry
from .models import Event

@registry.register_document
class EventDocument(Document):
    class Index:
        name = 'event'  # index name in Elasticsearch

    class Django:
        model = Event
        fields = [
            'id',
            'title',
            'description',
            
        ]
