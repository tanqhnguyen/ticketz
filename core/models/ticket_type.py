from django.db import models
from core.models import Event

class TicketType(models.Model):
    name = models.CharField(max_length=45)
    price = models.DecimalField(max_length=2, decimal_places=2, max_digits=2)
    type = models.CharField(max_length=45)
    amount = models.IntegerField()
#    event = models.ForeignKey(Event, related_name="tags", related_query_name="tag")

    class Meta:
        app_label = "core"