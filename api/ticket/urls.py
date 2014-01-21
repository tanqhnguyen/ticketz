from django.conf.urls import patterns, url

import api.ticket.views as views

urlpatterns = patterns('',
    url(r'^purchase$', views.PurchaseView.as_view(), name="api_ticket_purchase"),
)
