from django.db import models
from core.models import AbstractModel, User, TicketType, Event

class SoldTicket(AbstractModel):
    seat = models.CharField(max_length=45)
    event = models.ForeignKey(Event)
    ticket_type = models.ForeignKey(TicketType)
    user = models.ForeignKey(User)

    class Meta:
        app_label = "core"