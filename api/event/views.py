from api.views import ApiView
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required

class CreateView(ApiView):
    @method_decorator(login_required)
    def post(self, request):
        return self.json({"user_id": request.user.id})


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