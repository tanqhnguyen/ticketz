from core.utils import json_response as json_res
from core.models.event import Event
import json
from django.http import Http404


def event_owner(json_response = True):
    def decorator(function):
        def inner(request,*args,**kwargs):
            data = json.loads(request.body)
            req_event_id = data["id"]
            event = Event.objects.get(id = req_event_id)
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