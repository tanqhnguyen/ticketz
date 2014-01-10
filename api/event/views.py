from api.views import ApiView
from core.models.event import Event
from django.contrib.auth.decorators import login_required
import json
from django.http import HttpResponse
from django.utils.decorators import method_decorator
from core.decorators import event_owner


class CreateView(ApiView):
    @method_decorator(login_required)
    def post(self, request):
        user_id = request.user.id
        event = Event.first_or_create(user_id)
        data = event.json_data()

        return self.json({"data": data})

class DeleteView(ApiView):
    @method_decorator(login_required)
    @method_decorator(event_owner())
    def post(self, request):
            data = json.loads(request.raw_post_data)
            # data is now a Python dict representing the uploaded JSON.
            id = data['id']
            event = Event.objects.get(pk = id)
            event.delete()
            data = event.json_data()
            return self.json({"data": data})

class UpdateView(ApiView):
    @method_decorator(login_required)
    @method_decorator(event_owner())
    def post(self, request):
        data = json.loads(request.raw_post_data)
        # data is now a Python dict representing the uploaded JSON.
        id = data['id']
        event = Event.objects.get(pk = id)
        tckt_type=data['ticket_type']
        event.check_ticket_types(tckt_type)
        event.name=data['name']
        event.ticket_type=data['ticket_type']
        event.age_limit=data['age_limit']
        event.description=data['description']
        event.end_date=data['end_date']
        event.start_date=data['start_date']
        event.save()
        data = event.json_data()
        return self.json({"data": data})








