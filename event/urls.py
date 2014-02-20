from django.conf.urls import patterns, url

from event import views

urlpatterns = patterns('',
    url(r'^create$', views.CreateView.as_view(), name='event_create'),
    url(r'^update/(?P<event_id>\d+)$', views.UpdateView.as_view(), name='event_update'),
    url(r'^list$', views.ListView.as_view(), name='event_list'),
    url(r'^search$', views.SearchView.as_view(), name='event_search'),
    url(r'^(?P<slug>[-\w\d]+),(?P<id>\d+)/$', views.DetailView.as_view(), name='event_view'),
      
)