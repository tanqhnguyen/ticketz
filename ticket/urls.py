from django.conf.urls import patterns, url

from ticket import views

urlpatterns = patterns('',
    url(r'^list$', views.ListView.as_view(), name='ticket_list'),
    url(r'^(?P<code>[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})$', views.DetailView.as_view(), name='ticket_view'),
      
)