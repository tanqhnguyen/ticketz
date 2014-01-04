from api.views import ApiView
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required

class CreateView(ApiView):
    @method_decorator(login_required)
    def post(self, request):
        return self.json({"user_id": request.user.id})