from api.views import ApiView
from core.models import Event
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required
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
        id = self.json_data['id']
        event = Event.objects.get(pk = id)
        data = event.json_data()
        event.delete()
        return self.json({"data": data})

class UpdateView(ApiView):
    @method_decorator(login_required)
    @method_decorator(event_owner())
    def post(self, request):
        data = self.json_data
        event = Event.objects.get(pk = data['id'])
        ticket_types = data.get('ticket_types')
        json = data.get('json')

        if ticket_types:
            event.create_event_types(ticket_types)

        if json:
            for key, value in json.iteritems():
                event.json[key] = value
        
        unsafe_attributes = ['id', 'user_id', 'ticket_types', 'json']
        for attr in unsafe_attributes:
            if data.get(attr):
                del data[attr]

        event.set_attributes(**data)
        event.save()
        return self.json({'data': event.json_data()})

class ListView(ApiView):
    def get(self, request):
        offset = int(request.GET.get('offset', 0))
        limit = int(request.GET.get('limit', 10))
        print request.GET.get('sort[date_created]')
        print request.GET.get('sort[title]')

        events = [{"id": x, "title": "Event " + str(x), "is_active": x%2==0} for x in range(1, 1000)]
        check = request.GET.get('active') == 'true'
        events = [e for e in events if e['is_active'] == check]

        return self.json({
            "data": events[offset:offset+limit],
            "pagination": {
                "total": len(events),
                "offset": offset,
                "limit": limit
            }
        })








