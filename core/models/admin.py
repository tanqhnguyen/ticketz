#from ticketz.core.models import Core
from django.contrib import admin

class CoreAdmin(admin.ModelAdmin):

admin.site.register(Core,CoreAdmin)