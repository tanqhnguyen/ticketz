from django.conf.urls import patterns, url

from event import views

urlpatterns = patterns('',
    url(r'^create$', views.CreateView.as_view(), name='event_create'),
    url(r'^update/(?P<event_id>\d+)$', views.UpdateView.as_view(), name='event_update'),
    url(r'^list$', views.ListView.as_view(), name='event_list'),
    url(r'^(?P<event_id>\d+)$', views.event_view, name = 'event_view'),
      
)