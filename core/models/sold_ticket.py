from django.contrib.auth.models import AbstractUser
from django.db import models
from core.models.user import User
from core.models import TicketType
from core.models import Event


class SoldTicket(models.Model):
    seat = models.CharField(max_length=45)
    event_id = models.ForeignKey(Event)
    ticket_type_id = models.ForeignKey(TicketType)
    user_id = models.ForeignKey(User)



    class Meta:
        app_label = "core"