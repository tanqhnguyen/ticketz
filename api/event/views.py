from api.views import ApiView
from core.models import Event
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required
from core.decorators import event_owner
import re

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
        id = self.request.json_data['id']
        event = Event.objects.get(pk = id)
        data = event.json_data()
        event.delete()
        return self.json({"data": data})

class UpdateView(ApiView):
    @method_decorator(login_required)
    @method_decorator(event_owner())
    def post(self, request):
        data = self.request.json_data
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
        user_id = int(request.GET.get('user_id', request.user.id))

        conditions = {
            'user_id': user_id,
            'is_active': request.GET.get('active') == 'true'
        }
        
        events = Event.objects.filter(**conditions).all()[offset:limit]
        count = Event.objects.filter(user_id=user_id).count()


        return self.json({
            "data": [event.json_data() for event in events],
            "pagination": {
                "total": count,
                "offset": offset,
                "limit": limit
            }
        })

class UploadBannerView(ApiView):
    @method_decorator(login_required)
    @method_decorator(event_owner())
    def post(self, request):
        event = request.event
        banner = request.FILES['banner']

        # if the width of uploaded file > 1140px, resize it to 1140px
        # if the width of uploaded file < 1140px, keep it

        # compress the size of the image to 80% and change to .jpg

        # store the file to static/uploads/{uuid}.jpg
        # uuid can be generated using uuid module

        # set the file name ({uuid}.jpg) to event['json']['banner']
        # set the width of the banner to event['json']['banner_width']
        # set the height of the banner to event['json']['banner_height']

        # save the event and return the same format as the above APIs
        return self.json({'data': 'nothing'})




