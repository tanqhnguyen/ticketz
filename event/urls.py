from django.conf.urls import patterns, url

from event import views

urlpatterns = patterns('',
    url(r'^create$', views.CreateView.as_view(), name='event_create'),
    url(r'^update/(?P<event_id>\d+)$', views.UpdateView.as_view(), name='event_update'),
    url(r'^list$', views.ListView.as_view(), name='event_list'),
    url(r'^ticket/(?P<code>[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})$', views.TicketView.as_view(), name='event_ticket'),
    url(r'^(?P<slug>[-\w\d]+),(?P<id>\d+)/$', views.DetailView.as_view(), name='event_view'),
      
)