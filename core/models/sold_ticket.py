from django.db import models
from core.models import AbstractModel
import time
from django.forms.models import model_to_dict 
from qrcode import *
from django.core.urlresolvers import reverse

class SoldTicket(AbstractModel):
    created_date = models.BigIntegerField(default=int(round(time.time() * 1000)))
    code = models.TextField(max_length=36, unique=True)
    is_used = models.BooleanField(default=False)

    ticket_type = models.ForeignKey('TicketType', related_name="tickets")
    user = models.ForeignKey('User', related_name="tickets")
    event = models.ForeignKey('Event', related_name="tickets")

    class Meta:
        app_label = "core"

    def get_absolute_url(self):
        return reverse('ticket_view', kwargs={'code': self.code})

    def generate_url(self):
        return {
            'view': self.get_absolute_url()
        }


    def json_data(self):
        data = model_to_dict(self, exclude=['user', 'ticket_type', 'event'])
        data['event'] = self.event.json_data(['ticket_types', 'json'])
        data['url'] = self.generate_url()
        return data

    def generate_qr_code(self):
        # do nothings for now
        return self