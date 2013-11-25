from django.views.generic.base import View
from core.utils import json_response

class ApiView(View):
    def json(self, data):
        return json_response(data)