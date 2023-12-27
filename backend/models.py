from django.db import models
from django.contrib.auth.models import User, AbstractUser

# Create your models here.
class Note(models.Model):
    user = models.TextField(null=True, blank=False)
    body = models.TextField(null=True, blank=False)
    updated = models.DateTimeField(auto_now=True)       
    created = models.DateTimeField(auto_now_add=True)   

    def __str__(self):
        return self.body[0:50]


# class User(AbstractUser):
#     name = models.CharField(max_length=255)
#     email = models.CharField(max_length=255, unique=True)
#     password = models.CharField(max_length=255)
#     username = None

#     USERNAME_FIELD = 'email'
#     REQUIRED_FIELDS = []