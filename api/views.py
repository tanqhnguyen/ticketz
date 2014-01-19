from django.views.generic.base import View
from core.utils import json_response
import json
from django.views.decorators.csrf import csrf_exempt

class ApiView(View):
    @csrf_exempt
    def dispatch(self, *args, **kwargs):
        self.json_data = json.loads(self.request.body)
        return super(ApiView, self).dispatch(*args, **kwargs)

    def json(self, data):
        return json_response(data)