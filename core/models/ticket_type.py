from django.db import models
from core.models import AbstractModel
from django.forms.models import model_to_dict 

class TicketType(AbstractModel):
    name = models.CharField(max_length=45)
    price = models.DecimalField(decimal_places=2, max_digits=5)
    type = models.CharField(max_length=45)
    amount = models.IntegerField()
<<<<<<< HEAD
#    event = models.ForeignKey(Event, related_name="tags", related_query_name="tag")
=======
    event = models.ForeignKey('Event', related_name="ticket_types")
>>>>>>> 1804af7bb096b0302c616409c557a6da1cb1fb09

    class Meta:
        app_label = "core"

    def json_data(self):
        data = model_to_dict(self, exclude=['event'])
        data['event_id'] = self.event.id
        return data
