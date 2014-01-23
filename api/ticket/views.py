from api.views import ApiView
from core.models.user import UserException
from core.models import SoldTicket, Event
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required
from core.decorators import event_owner
from django.utils.translation import ugettext as _

class PurchaseView(ApiView):
    @method_decorator(login_required)
    def post(self, request):
        user = request.user
        data = self.request.json_data

        try:
            sold_ticket = user.purchase_ticket(data.get('ticket_type_id'))
            return self.json({
                "data": sold_ticket.json_data(),
                "redirect": sold_ticket.get_absolute_url(),
                "success": _("You have purchased the ticket")
            })
        except UserException, e:
            self.json({'error': e})

class ListView(ApiView):
    @method_decorator(login_required)
    def get(self, request):
        offset = int(request.GET.get('offset', 0))
        limit = int(request.GET.get('limit', 10))
        event_id = request.GET.get('event_id', None)
        pagination = {}
        user = request.user

        if event_id:
            try:
                event = Event.objects.get(pk=int(event_id))

                if event.user.id != request.user.id:
                    return self.json({'error': _("Invalid request")})

                pagination['total'] = event.tickets.count()
                sold_tickets = event.tickets.all()[offset:offset+limit]
            except Event.DoesNotExist:
                return self.json({'error': _("Invalid request")})
        else:
            pagination['total'] = user.tickets.count()
            sold_tickets = user.tickets.all()[offset:offset+limit]

        pagination['limit'] = limit
        pagination['offset'] = offset
        return self.json({
            'data': [sold_ticket.json_data() for sold_ticket in sold_tickets],
            'pagination': pagination
        })

class VerifyView(ApiView):
    @method_decorator(login_required)
    def post(self, request):
        data = self.request.json_data

        try:
            ticket = SoldTicket.objects.get(code=data.get('code'))
            event = ticket.ticket_type.event
            if event.user.id != self.request.user.id:
                raise Exception(_("Invalid request"))

            if ticket.is_used:
                raise Exception(_("Ticket has been used"))

            ticket.is_used = True
            ticket.save()

            self.json({
                'data': ticket.json_data()    
            })
        except Exception, e:
            self.json({'error': e})
        
        
        

        