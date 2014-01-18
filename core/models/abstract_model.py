from django.db import models

class AbstractModel(models.Model):
    class Meta:
        abstract = True

    def set_attributes(self, **kwargs):
        for key,value in kwargs.iteritems():
            setattr(self, key, value)

        return self