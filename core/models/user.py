from django.contrib.auth.models import AbstractUser
from django.db import models
from django.forms.models import model_to_dict 
from core.models import AbstractModel, TicketType
import time

class UserException(Exception):
    pass

class User(AbstractUser, AbstractModel):
    is_external = models.BooleanField(default=True)

    def get_social_user(self):
        if self.is_external:
            return self.social_auth.all()[0]
        return None

    class Meta:
        app_label = "core"

    def json_data(self):
        data = model_to_dict(self, fields=['id', 'username', 'first_name', 'last_name', 'email'])
        return data

    def purchase_ticket(self, ticket_type_id):
        ticket_type = TicketType.objects.get(pk=ticket_type_id)
        current_time = round(time.time() * 1000)

        event = ticket_type.event

        if current_time > event.end_date:
            raise UserException("The event has been ended")

        return self.sold_tickets.create(ticket_type_id=ticket_type_id)