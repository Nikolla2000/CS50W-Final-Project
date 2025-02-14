from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.
class User(AbstractUser):
    age = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(99)])
    country = models.CharField(max_length=64)

    groups = models.ManyToManyField(
            'auth.Group',
            related_name='custom_user_set',
            blank=True,
            help_text='The groups this user belongs to.',
            verbose_name='groups'
        )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='custom_user_set',
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions'
    )