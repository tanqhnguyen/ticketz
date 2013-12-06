from django.conf.urls import patterns, url

from event import views

urlpatterns = patterns('',
    url(r'^create$', views.CreateView.as_view(), name='event_create'),
    url(r'^(?P<event_id>\d+)$', views.event_view, name = 'event_view'),
      
)