import os
import json
from django.conf import settings as django_settings

current_path = os.path.dirname(__file__)
js_build_path = os.path.join(current_path, '..', 'static', 'js', 'build.json')
with open(js_build_path) as data_file:
    js_build_config = json.load(data_file)

def user(request):
    return {
        "user": request.user
    }

def js_config(request):
    return {
        "js_config": json.dumps(js_build_config)
    }

def settings(request):
    return {
        "GOOGLE_MAP_KEY": django_settings.GOOGLE_MAP_KEY
    }