import uuid

from django.core.validators import RegexValidator
from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Book(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, default=uuid.uuid4)


class Contact(models.Model):
    CONTACT_TYPE = [
        (0, 'Home'),
        (1, 'Mobile'),
        (2, 'Office')
    ]

    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    email = models.EmailField(blank=True)
    phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$', message="Must be like: '+4999999999999'.")
    phone = models.CharField(max_length=15)
    type = models.IntegerField(default=0, choices=CONTACT_TYPE)
