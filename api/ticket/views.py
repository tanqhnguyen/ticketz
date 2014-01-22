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
            return self.json({"data": sold_ticket.json_data()})
        except UserException, e:
            self.json({'error': e})

class ListView(ApiView):
    def get(self, request):
        offset = int(request.GET.get('offset', 0))
        limit = int(request.GET.get('limit', 10))
        user_id = int(request.GET.get('user_id', None))

        conditions = {

        }

        if user_id:
            conditions['user_id'] = user_id

        sold_tickets = SoldTicket.objects.filter(**conditions).all()[offset:limit]

        return self.json({
            'data': [sold_ticket.json_data() for sold_ticket in sold_tickets]    
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
        
        
        

        