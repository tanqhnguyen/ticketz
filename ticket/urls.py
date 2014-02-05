from django.conf.urls import patterns, url

from ticket import views

urlpatterns = patterns('',
    url(r'^list$', views.ListView.as_view(), name='ticket_list'),
    url(r'^(?P<code>\w+)$', views.DetailView.as_view(), name='ticket_view'),
      
)