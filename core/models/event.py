from django.contrib.auth.models import AbstractUser
from django.db import models
from core.models import Event
from core.models.user import User


class Event(models.Model):
    page_attribute = models.TextField()
    name = models.TextField(max_length=128)
    description = models.TextField()
    type = models.TextField(max_length=16)
    age_limit = models.IntegerField()
    live_date = models.DateTimeField()
    start_date = models.DateTimeField()
    user_id = models.ForeignKey(User)


    class Meta:
        app_label = "core"