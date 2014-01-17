import time
from django.db import models
from core.models import User
from jsonfield import JSONField
from django.forms.models import model_to_dict 


class Event(models.Model):
    title = models.TextField(max_length=128 , default="New Event")
    address_name = models.TextField(max_length=128, blank=True)
    address1 = models.TextField(blank=True)
    address2 = models.TextField(blank=True)
    city = models.TextField(blank=True)
    zipcode = models.TextField(max_length=5, blank=True),
    description = models.TextField(default="")
    end_date = models.BigIntegerField(default=int(round(time.time() * 1000)))
    start_date = models.BigIntegerField(default=int(round(time.time() * 1000)))
    organizer_name = models.TextField(blank=True)
    organizer_contact = models.TextField(blank=True)
    is_active = models.BooleanField(default=False)
    json = JSONField()

    user = models.ForeignKey(User)

    class Meta:
        app_label = "core"

    def check_ticket_types(self,ticket_types):
        pass

    def json_data(self):
        data = model_to_dict(self)
        data['user'] = self.user.json_data()
        return data

    @classmethod
    def first_or_create(cls,user_id):
        try:
            event = cls.objects.get(user_id=user_id)
        except Exception:
            event = cls()
            event.user_id = user_id
            event.title = 'My Event'
            event.description = 'Describe your event'
            event.json = {
                'detailBodyBgColor': '#ffffff',
                'detailTitleBgColor': '#307ecc',
                'detailTitleColor': '#ffffff',
                'locationTitleBgColor': '#307ecc',
                'locationTitleColor': '#ffffff',
                'locationBodyBgColor': '#ffffff',
                'locationBodyColor': '#000000',
                'ticketTitleBgColor': '#307ecc',
                'ticketTitleColor': '#ffffff',
                'ticketBodyBgColor': '#ffffff',
                'ticketBodyColor': '#000000',
                'organizerTitleBgColor': '#307ecc',
                'organizerTitleColor': '#ffffff',
                'organizerBodyBgColor': '#ffffff',
                'organizerBodyColor': '#000000'
            }

            event.save()
        return event
