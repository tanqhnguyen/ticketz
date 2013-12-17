import datetime
from django.core.serializers import json
from django.db import models
from core.models import User


class Event(models.Model):
    page_attribute = models.TextField()
    name = models.TextField(max_length=128 , default="New Event")
    description = models.TextField(default="")
    type = models.TextField(max_length=16)
    age_limit = models.IntegerField(default=0)
    end_date = models.DateTimeField(default=datetime.datetime.now())
    start_date = models.DateTimeField(default=datetime.datetime.now())
    is_active = models.BooleanField(default=False)
    user = models.ForeignKey(User)

    class Meta:
        app_label = "core"

    def json_data(self):

            description = self.description
            age_limit = self.age_limit
            name = self.name
            start_date = self.start_date.strftime('%Y-%m-%d %H:%M:%S')
            end_date = self.end_date.strftime('%Y-%m-%d %H:%M:%S')
            is_active = self.is_active
            data = {"id":self.id,"name":name,"description":description,"age_limit":age_limit,
                    "start_date":start_date,"end_date":end_date,"is_active":is_active}
            return data

    @classmethod
    def first_or_create(cls,user_id):
        try:
            event = cls.objects.get(user_id=user_id)
        except Exception:
            event = cls()
            event.user_id = user_id
            event.save()
        return event
