from random import randrange

from faker import Faker

from django.contrib.auth.models import User
from django.core.management.base import BaseCommand, CommandError

from rest_api.models import Book, Contact


class Command(BaseCommand):
    help = 'Generates fake contacts'

    def add_arguments(self, parser):
        parser.add_argument('count', nargs='+', type=int)

    def handle(self, *args, **options):
        superusers = User.objects.filter(is_superuser=True)[0]
        faker = Faker()
        book = Book.objects.create(
            owner=superusers,
            name=faker.unique.name(),
        )

        contacts = []
        for i in range(options['count'][0]):
            contacts.append(Contact(
                book=book,
                name=faker.unique.name(),
                email=faker.unique.email(),
                phone=faker.unique.phone_number(),
                type=randrange(3)
            ))

        Contact.objects.bulk_create(contacts)

        self.stdout.write(self.style.SUCCESS(f"Successfully {options['count'][0]} contacts have been created."))
