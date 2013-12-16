from api.views import ApiView
from core.models.event import Event
from django.contrib.auth.decorators import login_required
import django.utils.json as json
from django.http import HttpResponse
from django.utils.decorators import method_decorator


class CreateView(ApiView):

    @method_decorator(login_required)
    def post(self, request):
        event = Event()
        event.user = request.user
        event.is_active=False
        data = event.json_data()
        return self.json(data)


class DeleteView(ApiView):
    @login_required
    def post(self, request):
            json_data = request.read()
            # json_data contains the data uploaded in request
            data = json.loads(json_data)
            # data is now a Python dict representing the uploaded JSON.
            id = data['id']
            event = Event.objects.get(pk = id)
            data = event.json_data()
            if event.user == request.user:
                return self.json(data)
            else:
                return self.json({"Permission Error":"Not enough permission to update event"})





