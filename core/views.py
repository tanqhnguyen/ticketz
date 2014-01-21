from django.views.generic.base import TemplateView
from django.shortcuts import render, redirect
from forms import RegistrationForm
from django.contrib.auth import authenticate, login
from core.models.event import Event
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator

class IndexView(TemplateView):
    template_name = 'core/index.html'

    def get_context_data(self, **kwargs):
        context = super(IndexView, self).get_context_data(**kwargs)
        context['less'] = 'core'
        return context

class ProfileView(TemplateView):
    template_name = 'core/profile.html'

    @method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
        return super(ProfileView, self).dispatch(*args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super(ProfileView, self).get_context_data(**kwargs)
        context['less'] = 'core'
        return context

def register(request):
    if request.method == 'POST':
        form = RegistrationForm(request.POST)
        if form.is_valid():
            user = form.save(True)
            user = authenticate(username=request.POST['username'], password=request.POST['password1'])
            login(request, user)
            return redirect('/')
    else:
        form = RegistrationForm()

    context = {'form': form, 'less': 'core'}
    return render(request, 'core/register.html', context)
    
    



