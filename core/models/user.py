from django.contrib.auth.models import AbstractUser
from django.db import models
from django.forms.models import model_to_dict 

class User(AbstractUser):
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