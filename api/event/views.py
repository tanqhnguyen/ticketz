from api.views import ApiView
from core.models import Event, SoldTicket
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required
from core.decorators import event_owner
import re
from django.utils.translation import ugettext as _

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
        
        unsafe_attributes = ['id', 'user_id', 'ticket_types', 'json', 'is_active']
        for attr in unsafe_attributes:
            if data.get(attr):
                del data[attr]

        event.set_attributes(**data)
        event.save()
        return self.json({
            'data': event.json_data(),
            'success': _('Saved event successfully')
        })

class ListView(ApiView):
    def get(self, request):
        offset = int(request.GET.get('offset', 0))
        limit = int(request.GET.get('limit', 10))
        upcoming = request.GET.get('filter[upcoming]', 'false') == 'true'

        event_objects = Event.objects

        conditions = {
            'is_active': request.GET.get('active', 'true') == 'true'
        }
        
        if upcoming:
            tickets = SoldTicket.objects.filter(user_id=request.user.id).all().distinct('event')
            conditions['id__in'] = [ticket.event.id for ticket in tickets]
        else:
            user_id = int(request.GET.get('user_id', request.user.id))
            conditions['user_id'] = user_id    
        
        events = event_objects.filter(**conditions).all()[offset:offset+limit]
        count = event_objects.filter(**conditions).count()

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
        event.upload_banner(banner)

        return self.json({
            'data': event.json_data(),
            'success': _("New banner has been uploaded successfully")
        })

class DeleteBannerView(ApiView):
    @method_decorator(login_required)
    @method_decorator(event_owner())
    def post(self, request):
        event = request.event

        event.delete_old_banner()
        return self.json({
            'data': event.json_data(),
            'success': _("Your banner has been deleted")    
        })

class PublishView(ApiView):
    @method_decorator(login_required)
    @method_decorator(event_owner())
    def post(self, request):
        event = request.event
        event.is_active = True
        event.save()
        return self.json({
            'data': event.json_data(),
            'success': _('Your event has been published')    
        })  

class UnpublishView(ApiView):
    @method_decorator(login_required)
    @method_decorator(event_owner())
    def post(self, request):
        event = request.event
        event.is_active = False
        event.save()
        return self.json({
            'data': event.json_data(),
            'success': _('Your event has been unpublished')    
        })  

class ReportView(ApiView):
    @method_decorator(login_required)
    @method_decorator(event_owner())

    def get(self, request):
        event = request.event

        return self.json({
            'data': event.sale_report()
        })