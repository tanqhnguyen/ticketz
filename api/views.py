from django.views.generic.base import View
from core.utils import json_response
import json

class ApiView(View):
    def dispatch(self, *args, **kwargs):
        self.json_data = json.loads(self.request.body)
        return super(ApiView, self).dispatch(*args, **kwargs)

    def json(self, data):
        return json_response(data)