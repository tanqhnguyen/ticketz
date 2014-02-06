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
            return self.json({'error': str(e)})

class ListView(ApiView):
    @method_decorator(login_required)
    def get(self, request):
        offset = int(request.GET.get('offset', 0))
        limit = int(request.GET.get('limit', 10))
        event_id = request.GET.get('event_id', None)
        pagination = {}
        user = request.user

        order_by_created_date = request.GET.get('order[created_date]', 'asc')
        if order_by_created_date == 'desc':
            order_by_created_date = '-created_date'
        else: 
            order_by_created_date = 'created_date'

        if event_id:
            try:
                event = Event.objects.get(pk=int(event_id))

                if event.user.id != request.user.id:
                    return self.json({'error': _("Invalid request")})

                pagination['total'] = event.tickets.count()
                tickets = event.tickets
            except Event.DoesNotExist:
                return self.json({'error': _("Invalid request")})
        else:
            pagination['total'] = user.tickets.count()
            tickets = user.tickets

        sold_tickets = tickets.order_by(order_by_created_date).all()[offset:offset+limit]
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
            code = data.get('code')
            code = code.upper()
            
            ticket = SoldTicket.objects.get(code=code)
            event = ticket.ticket_type.event
            if event.user.id != self.request.user.id:
                raise Exception(_("Invalid request"))

            if ticket.is_used:
                raise Exception(_("Ticket has been used"))

            ticket.is_used = True
            ticket.save()

            return self.json({
                'data': ticket.json_data(),
                'success': _("The ticket is valid and marked as used")
            })
        except Exception, e:
            return self.json({'error': str(e)})

class RefundView(ApiView):
    @method_decorator(login_required)
    def post(self, request):
        data = self.request.json_data

        try:
            code = data.get('code')
            code = code.upper()
            
            ticket = SoldTicket.objects.get(code=code)
            event = ticket.ticket_type.event
            if event.user.id != self.request.user.id:
                raise Exception(_("Invalid request"))

            ticket.is_used = False
            ticket.save()

            return self.json({
                'data': ticket.json_data()
            })
        except Exception, e:
            return self.json({'error': str(e)})
        
        
        

        