import random
from faker import Faker
from django.utils.text import slugify
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from project.event.models import Event, Category, Venue

User = get_user_model()
fake = Faker()

class Command(BaseCommand):
    help = "Generate dummy venues, categories, and events"

    def handle(self, *args, **kwargs):
        # --- Create dummy venues ---
        venues = []
        for _ in range(5):
            venue = Venue.objects.create(
                name=fake.company(),
                address=fake.address(),
                city=fake.city(),
                state=fake.state(),
                country=fake.country(),
                capacity=random.randint(50, 1000),
                contact_phone=fake.phone_number(),
                contact_email=fake.email(),
                is_active=True
            )
            venues.append(venue)

        # --- Create dummy categories ---
        categories = []
        category_names = ["Music", "Art", "Tech", "Sports", "Education"]
        for name in category_names:
            category, _ = Category.objects.get_or_create(
                name=name,
                description=fake.text(max_nb_chars=100),
                slug=slugify(name),
                is_active=True
            )
            categories.append(category)

        # --- Create dummy events ---
        users = list(User.objects.all())
        for _ in range(10):
            Event.objects.create(
                title=fake.sentence(nb_words=5),
                description=fake.text(max_nb_chars=300),
                category=random.choice(categories),
                venue=random.choice(venues),
                organizer=random.choice(users),
                event_date=fake.date_time_between(start_date="now", end_date="+30d"),
                end_date=fake.date_time_between(start_date="+1d", end_date="+60d"),
                total_tickets=random.randint(50, 500),
                available_tickets=random.randint(0, 50),
                base_price=round(random.uniform(10.0, 200.0), 2),
                status=random.choice(["Upcoming", "Ongoing", "Completed"]),
                terms_conditions=fake.text(max_nb_chars=200),
                image=None
            )

        self.stdout.write(self.style.SUCCESS("Dummy data generated successfully!"))
