from django.conf.urls import patterns, url

import api.user.views as views

urlpatterns = patterns('',
    url(r'^update$', views.UpdateView.as_view(), name="api_user_update"),
)
