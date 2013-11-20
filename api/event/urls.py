from django.conf.urls import patterns, url

import api.event.views as views

urlpatterns = patterns('',
    url(r'create', views.CreateView.as_view(), name="api_event_create"),
)