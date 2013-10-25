from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    is_external = models.BooleanField(default=True)

    def get_social_user(self):
        if self.is_external:
            return self.social_auth.all()[0]
        return None

    class Meta:
        app_label = "core"