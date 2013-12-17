from django.contrib import admin
from core.models.event import Event
from core.models.user import User

admin.site.register(Event)
admin.site.register(User)
