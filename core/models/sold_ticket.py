from django.db import models
from core.models import AbstractModel
import time
from django.forms.models import model_to_dict 

class SoldTicket(AbstractModel):
    ticket_type = models.ForeignKey('TicketType')
    user = models.ForeignKey('User', related_name="sold_tickets")
    created_date = models.BigIntegerField(default=int(round(time.time() * 1000)))
    code = models.TextField(max_length=36)

    class Meta:
        app_label = "core"

    def json_data(self):
        data = model_to_dict(self, exclude=['user', 'ticket_type'])
        return data