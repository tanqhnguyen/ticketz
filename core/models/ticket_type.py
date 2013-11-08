from django.contrib.auth.models import AbstractUser
from django.db import models
from core.models import Event


class SoldTicket(models.Model):
    name = models.CharField(max_length=45)
    price = models.DecimalField(max_length=2)
    type = models.CharField(max_length=45)
    amount = models.IntegerField()
    event_id = models.ForeignKey(Event)



    class Meta:
        app_label = "core"