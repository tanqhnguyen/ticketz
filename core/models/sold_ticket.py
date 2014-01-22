from django.db import models
from core.models import AbstractModel
import time
from django.forms.models import model_to_dict 
from qrcode import *

class SoldTicket(AbstractModel):
    ticket_type = models.ForeignKey('TicketType', related_name="tickets")
    user = models.ForeignKey('User', related_name="tickets")
    created_date = models.BigIntegerField(default=int(round(time.time() * 1000)))
    code = models.TextField(max_length=36, unique=True)
    is_used = models.BooleanField(default=False)

    class Meta:
        app_label = "core"

    def json_data(self):
        data = model_to_dict(self, exclude=['user', 'ticket_type'])
        return data

    def generate_qr_code(self):
        # do nothings for now
        return self