import time
from django.db import models
from core.models import AbstractModel
from jsonfield import JSONField
from django.forms.models import model_to_dict 
from django.core.urlresolvers import reverse
from django.core.exceptions import ObjectDoesNotExist
from slugify import slugify
import uuid
from PIL import Image
import StringIO
from django.conf import settings
import os


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
            'purchaseTicket': reverse('api_ticket_purchase'),
            'publish': reverse('api_event_publish'),
            'unpublish': reverse('api_event_unpublish'),
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
        'map': None,
        'bgColor': '#ffffff',
        'titleColor': '#2679b5',
        'dateColor': '#8089a0'
    }

    def delete_old_banner(self):
        banner = self.json['banner']
        if banner:
            try:
                os.remove(self.generate_banner_path(banner['name']))
                os.remove(self.generate_banner_thumb_path(banner['name']))
            except OSError, e:
                pass
            self.json['banner'] = None
            self.save()
        return self

    def generate_banner_path(self, name):
        banner_name = name+'.jpg'
        return os.path.join(settings.MEDIA_ROOT, 'banner', banner_name)

    def generate_banner_thumb_path(self, name):
        thumbnail_name = name+'_thumb.jpg'
        return os.path.join(settings.MEDIA_ROOT, 'banner_thumb', thumbnail_name)

    def upload_banner(self, file):
        self.delete_old_banner()
        name = str(uuid.uuid4())

        im = Image.open(StringIO.StringIO(file.read()))
        width = im.size[0]
        max_width = 1084
        ratio = float(max_width)/width
        resized_height = int(im.size[1]*ratio)
        new_size = (max_width,resized_height)

        if width > max_width:
            resized_im = im.resize(new_size)
        else:
            resized_im = im

        banner_path = self.generate_banner_path(name);
        resized_im.save(banner_path, 'JPEG')

        # make thumbnail
        thumbnail_size = 128, 128
        im.thumbnail(thumbnail_size, Image.ANTIALIAS)
        thumbnail_path = self.generate_banner_thumb_path(name)
        im.save(thumbnail_path, 'JPEG')

        banner_name = name+'.jpg'
        thumbnail_name = name+'_thumb.jpg'
        self.json['banner'] = {
            'name': name,
            'full': os.path.join(settings.STATIC_URL, 'uploads', 'banner', banner_name),
            'thumb': os.path.join(settings.STATIC_URL, 'uploads', 'banner_thumb', thumbnail_name),
            'width': resized_im.size[0],
            'height': resized_im.size[1]
        }

        self.save()
        return self

    def is_ended(self):
        return self.end_date > int(round(time.time() * 1000))

    @classmethod
    def first_or_create(cls,user_id):
        try:
            event = cls.objects.get(user_id=user_id, is_active=False)
        except ObjectDoesNotExist,e:
            event = cls()
            event.user_id = user_id
            event.title = 'My Event'
            event.description = 'Describe your event'
            event.json = cls.default_json
            event.created_date = int(round(time.time() * 1000))

            event.save()
        return event
