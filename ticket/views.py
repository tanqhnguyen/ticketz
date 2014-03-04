from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.views.generic.base import View, TemplateView
from core.models import Event
from django.shortcuts import render, redirect
from core.decorators import event_owner
import simplejson
from django.core.urlresolvers import reverse
from django.http import Http404

class ListView(TemplateView):
    template_name = 'ticket/list.html'

    @method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
        return super(ListView, self).dispatch(*args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super(ListView, self).get_context_data(**kwargs)
        context['requirejs'] = 'ticket_list'
        context['less'] = 'ticket_list'
        return context

class DetailView(TemplateView):
    template_name = 'ticket/view.html'

    @method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
        return super(DetailView, self).dispatch(*args, **kwargs)

    def get_context_data(self, **kwargs):
        code = kwargs.get('code')
        ticket = self.request.user.tickets.get(code=code)
        context = super(DetailView, self).get_context_data(**kwargs)

        detail_template_context = ticket.generate_detail_template_context()
        return dict(context.items() + detail_template_context.items())