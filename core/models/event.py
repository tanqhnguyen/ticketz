from django.core.serializers import json
from django.db import models
from core.models import User

class Event(models.Model):
    page_attribute = models.TextField()
    name = models.TextField(max_length=128 , default="New Event")
    description = models.TextField(default="")
    type = models.TextField(max_length=16)
    age_limit = models.IntegerField(default=None)
    end_date = models.DateTimeField(default=None)
    start_date = models.DateTimeField(default=None)
    is_active = models.BooleanField(default=False)
    user = models.ForeignKey(User)

    class Meta:
        app_label = "core"

    def setParams(self, request):
            json_data = request.read()
            # json_data contains the data uploaded in request
            data = json.loads(json_data)
            # data is now a Python dict representing the uploaded JSON.
            id = self._get_pk_val
            name = self.name
            description = self.description
            age_limit = self.age_limit
            start_date = self.start_date
            end_date = self.end_date
            is_active = self.is_active
            data = {"id":id,"name":name,"description":description,"age_limit":age_limit,
                    "start_date":start_date,"end_date":end_date,"is_active":is_active}
            return data
