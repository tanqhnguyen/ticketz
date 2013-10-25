from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    
    def get_social_user(self):
        if self.social_auth.count() > 0:
            return self.social_auth.all()[0]
        return None

    class Meta:
        app_label = "core"