from api.views import ApiView
from core.models.event import Event
from django.contrib.auth.decorators import login_required
import json
from django.http import HttpResponse
from django.utils.decorators import method_decorator


class CreateView(ApiView):

    # @method_decorator(login_required)
    def post(self, request):
        user_id = request.user.id
        event = Event.first_or_create(user_id)
        data = event.json_data()
        return self.json({"data": data})


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
                return self.json({"data": data})
            else:
                return self.json({"error":"Not enough permission to update event"})





