from django.db import models
from core.models.user import User
from core.models import TicketType
from core.models import Event

class SoldTicket(models.Model):
    seat = models.CharField(max_length=45)
    event = models.ForeignKey(Event)
    ticket_type = models.ForeignKey(TicketType)
    user = models.ForeignKey(User)

    class Meta:
        app_label = "core"