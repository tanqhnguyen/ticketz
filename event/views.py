from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.views.generic.base import TemplateView
from core.models import Event

class CreateView(TemplateView):
    template_name = 'event/create.html'

    @method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
        return super(CreateView, self).dispatch(*args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super(CreateView, self).get_context_data(**kwargs)
        context['requirejs'] = 'event_create'
        context['less'] = 'event_create'
        return context
        
        
        
def event_view(request, event_id):

    event = Event.objects.get(pk=event_id)
    
    name = event.name
    description = event.description
    age_limit = event.age_limit
    live_date = event.live_date
    start_date = event.start_date 

    return render_to_response("event/view.html", {"event_id":event_id, "page_attribute":page_attribute, "name": name, "description": description,"live_date": live_date,"start_date": start_date},context_instance = RequestContext(request))