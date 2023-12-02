from django.db import models
from django.contrib.auth.models import User, AbstractUser

# Create your models here.
class Note(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Establishes a ForeignKey relationship with the User model
    body = models.TextField(null=True, blank=False)
    updated = models.DateTimeField(auto_now=True)       
    created = models.DateTimeField(auto_now_add=True)   

    def __str__(self):
        return self.body[0:50]
