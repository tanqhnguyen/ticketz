from django.db import models
import datetime

class AbstractModel(models.Model):
    class Meta:
        abstract = True

    def set_attributes(self, **kwargs):
        for key,value in kwargs.iteritems():
            setattr(self, key, value)

        return self

    def format_date(self, attribute, format='%b %d.%m.%Y %H:%M'):
        time = int(getattr(self, attribute))
        time = int(round(time/1000))
        return datetime.datetime.fromtimestamp(time).strftime(format)