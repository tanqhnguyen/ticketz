from django.conf.urls import patterns, url
from django.contrib.auth.views import login, logout
from core import views

urlpatterns = patterns('',
    url(r'^register$', views.register, name='register'),
    url(r'^login$', login, {'template_name': 'core/login.html'}),
    url(r'^logout$', logout, {'next_page': '/'}),
    url(r'', views.IndexView.as_view()),
    url(r'^$', views.IndexView.as_view()),
)