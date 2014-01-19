from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.views.generic.base import View, TemplateView
from core.models import Event
from django.shortcuts import render, redirect
from core.decorators import event_owner
import simplejson

class CreateView(View):
    @method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
        return super(CreateView, self).dispatch(*args, **kwargs)

    def get(self, request):
        user_id = request.user.id
        event = Event.first_or_create(user_id)
        return redirect(event)

class UpdateView(TemplateView):
    template_name = 'event/update.html'

    @method_decorator(login_required)
    @method_decorator(event_owner(json_response=False))
    def dispatch(self, *args, **kwargs):
        return super(UpdateView, self).dispatch(*args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super(UpdateView, self).get_context_data(**kwargs)
        context['requirejs'] = 'event_update'
        context['less'] = 'event_update'
        context['event'] = Event.objects.get(pk=kwargs.get('event_id')).json_data()
        return context

class ListView(TemplateView):
    template_name = 'event/list.html'

    @method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
        return super(ListView, self).dispatch(*args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super(ListView, self).get_context_data(**kwargs)
        context['requirejs'] = 'event_list'
        context['less'] = 'event_list'
        return context
        
def event_view(request, event_id):

    event = Event.objects.get(pk=event_id)
    
    name = event.name
    description = event.description
    age_limit = event.age_limit
    live_date = event.live_date
    start_date = event.start_date 

    return render_to_response("event/view.html", {"event_id":event_id, "page_attribute":page_attribute, "name": name, "description": description,"live_date": live_date,"start_date": start_date},context_instance = RequestContext(request))