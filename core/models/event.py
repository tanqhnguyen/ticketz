import time
from django.db import models
from core.models import AbstractModel
from jsonfield import JSONField
from django.forms.models import model_to_dict 
from django.core.urlresolvers import reverse
from django.core.exceptions import ObjectDoesNotExist


class Event(AbstractModel):
    title = models.TextField(max_length=128 , default="New Event")
    address_name = models.TextField(max_length=128, blank=True)
    address1 = models.TextField(blank=True)
    address2 = models.TextField(blank=True)
    city = models.TextField(blank=True)
    zipcode = models.TextField(max_length=5, blank=True),
    description = models.TextField(default="")
    end_date = models.BigIntegerField(default=int(round(time.time() * 1000)))
    start_date = models.BigIntegerField(default=int(round(time.time() * 1000)))
    created_date = models.BigIntegerField(default=int(round(time.time() * 1000)))
    organizer_name = models.TextField(blank=True)
    organizer_contact = models.TextField(blank=True)
    is_active = models.BooleanField(default=False)
    json = JSONField()

    user = models.ForeignKey('User')

    class Meta:
        app_label = "core"

    def create_event_types(self,ticket_types):
        keep_ids = [ticket_type.get('id') for ticket_type in ticket_types]
        self.ticket_types.exclude(id__in=keep_ids).all().delete()
        for ticket_type in ticket_types:
            keys = ['price', 'amount', 'name', 'type']
            data = {key: ticket_type.get(key) for key in keys}
            try:
                ticket_type = self.ticket_types.get(id=ticket_type.get('id'))
                ticket_type.__dict__.update(**data)
                ticket_type.save()
            except ObjectDoesNotExist, e:
                self.ticket_types.create(**data)
        return self

    def get_urls(self):
        return {
            'view': reverse('event_view', kwargs={'event_id': self.id}),
            'update': reverse('event_update', kwargs={'event_id': self.id})
        }

    def json_data(self):
        data = model_to_dict(self, exclude=['user', 'json'])
        data['user_id'] = self.user.id
        data['json'] = Event.default_json
        data['json'].update(self.json)
        data['ticket_types'] = [ticket_type.json_data() for ticket_type in self.ticket_types.all()]
        data['url'] = self.get_urls()
        return data

    default_json = {
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
        'organizerBodyColor': '#000000',
        'commonBodyBgColor': '#ffffff',
        'commonBodyColor': '#000000',
        'commonTitleBgColor': '#307ecc',
        'commonTitleColor': '#ffffff'
    }

    @classmethod
    def first_or_create(cls,user_id):
        try:
            event = cls.objects.get(user_id=user_id)
        except ObjectDoesNotExist,e:
            event = cls()
            event.user_id = user_id
            event.title = 'My Event'
            event.description = 'Describe your event'
            event.json = cls.default_json
            event.created_date = int(round(time.time() * 1000))

            event.save()
        return event
