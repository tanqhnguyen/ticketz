from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.views.generic.base import View, TemplateView
from core.models import Event
from django.shortcuts import render, redirect
from core.decorators import event_owner
import simplejson
from django.core.urlresolvers import reverse
from django.http import Http404

class CreateView(View):
    @method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
        return super(CreateView, self).dispatch(*args, **kwargs)

    def get(self, request):
        user_id = request.user.id
        event = Event.first_or_create(user_id)
        return redirect(reverse('event_update', kwargs={'event_id': event.id}))

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
        
class DetailView(TemplateView):
    template_name = 'event/view.html'

    def get_context_data(self, **kwargs):
        event = Event.objects.get(pk=kwargs.get('id'))
        context = super(DetailView, self).get_context_data(**kwargs)
        context['requirejs'] = 'event_view'
        context['less'] = 'event_view'
        context['event'] = event.json_data()
        return context

class TicketView(TemplateView):
    template_name = 'event/ticket.html'

    @method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
        return super(TicketView, self).dispatch(*args, **kwargs)

    def get_context_data(self, **kwargs):
        code = kwargs.get('code')
        ticket = self.request.user.tickets.get(code=code)
        event = ticket.ticket_type.event
        context = super(TicketView, self).get_context_data(**kwargs)
        print event
        context['event'] = event
        context['start_date'] = event.format_date('start_date')
        context['end_date'] = event.format_date('end_date')
        context['ticket'] = ticket
        return context