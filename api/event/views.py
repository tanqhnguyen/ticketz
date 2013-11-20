from api.views import ApiView

class CreateView(ApiView):
    def get(self, request):
        return self.json({"it is": "ok"})