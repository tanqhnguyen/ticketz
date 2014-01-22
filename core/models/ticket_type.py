from django.db import models
from core.models import AbstractModel
from django.forms.models import model_to_dict 

class TicketType(AbstractModel):
    name = models.CharField(max_length=45)
    price = models.DecimalField(decimal_places=2, max_digits=5)
    amount = models.IntegerField()
    event = models.ForeignKey('Event', related_name="ticket_types")
    description = models.TextField(max_length=128)

    class Meta:
        app_label = "core"

    def json_data(self):
        data = model_to_dict(self, exclude=['event'])
        data['amount_left'] = self.get_amount_left()
        data['event_id'] = self.event.id
        return data

    def get_amount_left(self):
        return self.amount - self.tickets.count()