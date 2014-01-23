import time
from django.db import models
from core.models import AbstractModel
from jsonfield import JSONField
from django.forms.models import model_to_dict 
from django.core.urlresolvers import reverse
from django.core.exceptions import ObjectDoesNotExist
from slugify import slugify
import uuid


class Event(AbstractModel):
    title = models.TextField(max_length=128 , default="New Event")
    address_name = models.TextField(max_length=128, blank=True)
    address1 = models.TextField(blank=True)
    address2 = models.TextField(blank=True)
    city = models.TextField(blank=True)
    zipcode = models.TextField(max_length=5, blank=True)
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
            keys = ['price', 'amount', 'name', 'description']
            data = {key: ticket_type.get(key) for key in keys}
            try:
                ticket_type = self.ticket_types.get(id=ticket_type.get('id'))
                ticket_type.__dict__.update(**data)
                ticket_type.save()
            except ObjectDoesNotExist, e:
                self.ticket_types.create(**data)
        return self

    def slugify(self):
        return slugify(self.title)

    def get_absolute_url(self):
        return reverse('event_view', kwargs={'id': self.id, 'slug': self.slugify()})

    def generate_url(self, name=None):
        urls = {
            'view': self.get_absolute_url(),
            'update': reverse('event_update', kwargs={'event_id': self.id}),
            'uploadBanner': reverse('api_event_upload_banner'),
            'deleteBanner': reverse('api_event_delete_banner'),
            'purchaseTicket': reverse('api_ticket_purchase')
        }

        if name is None:
            return urls

        return urls.get(name)

    def json_data(self, exclude=[]):
        data = model_to_dict(self, exclude=['user', 'json'])
        data['user_id'] = self.user.id
        data['json'] = Event.default_json
        data['json'].update(self.json)
        data['ticket_types'] = [ticket_type.json_data() for ticket_type in self.ticket_types.all()]
        data['url'] = self.generate_url()

        data = {key: value for key, value in data.iteritems() if key not in exclude}
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
        'commonTitleColor': '#ffffff',
        'banner': None,
        'map': None
    }

    def generate_banner_path(name=None):
        if name is None:
            name = self.generate_logo_name()

        prefix = 'static/uploads/%s'
        return prefix % name

    def generate_banner_name():
        return "%s.%s" % (str(uuid.uuid4()), 'jpg')

    def delete_old_banner(self):
        # TODO: implement this

        # delete file at {self.generate_banner_path(self.json['banner'])}

        # set event['json']['banner'] to None
        pass

    def store_banner(self, file):
        # TODO: implement this

        # if the width of uploaded file > 1140px, resize it to 1140px
        # if the width of uploaded file < 1140px, keep it

        # compress the size of the image to 80% and change to .jpg

        # store the file to {self.generate_logo_path()}

        # set the file path {self.generate_logo_path()} to event['json']['banner']
        # set the width of the banner to event['json']['banner_width']
        # set the height of the banner to event['json']['banner_height']

        # save the event and {return self}
        pass

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
