from core.utils import json_response as json_res
from core.models.event import Event
import json
from django.http import Http404


def event_owner(json_response = True):
    def decorator(function):
        def inner(request,*args,**kwargs):
            content_type = request.META.get('CONTENT_TYPE')
            if content_type == 'application/json':
                data = json.loads(request.body)
            elif request.method == 'POST':
                data = request.POST
            else:
                data = request.GET

            event_id = kwargs.get('event_id', data.get('id', data.get('event_id')))
            event = Event.objects.get(id = event_id)
            request.event = event
            owner = event.user
            if owner.id is request.user.id:
                return function(request,*args,**kwargs)
            else:
                if json_response is True:
                    return json_res({"error":"invalid user"})
                else:
                    raise Http404
        return inner
    return decorator