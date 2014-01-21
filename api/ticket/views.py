from api.views import ApiView
from core.models.user import UserException
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required

class PurchaseView(ApiView):
    @method_decorator(login_required)
    def post(self, request):
        user = request.user
        data = self.json_data

        try:
            sold_ticket = user.purchase_ticket(data.ticket_type_id)
            return self.json({"data": sold_ticket.json_data()})
        except UserException, e:
            self.json({'error': e})
        

        