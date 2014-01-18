from django.conf.urls import patterns, url

import api.event.views as views

urlpatterns = patterns('',
    url(r'^create$', views.CreateView.as_view(), name="api_event_create"),
    url(r'^list$', views.ListView.as_view(), name="api_event_list"),
    url(r'^delete$', views.DeleteView.as_view(), name="api_event_delete"),
    url(r'^update$', views.UpdateView.as_view(), name="api_event_update"),
)
