from django.db import models

# Create your models here.
class Note(models.Model):
    body = models.TextField(null=True, blank=True)
    #model for update fields
    updated = models.DateTimeField(auto_now=True)       #gets timestamp everytime Note model is saved
    created = models.DateTimeField(auto_now_add=True)   #gets timestamp only on creation of model 

    def __str__(self):
        #str method to fetch first 50 chars in instance of long msg
        return self.body[0:50]
