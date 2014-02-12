from django.conf.urls import patterns, include, url

urlpatterns = patterns('',
    url(r'^ticket/', include('api.ticket.urls')),
    url(r'^event/', include('api.event.urls')),
    url(r'^user/', include('api.user.urls')),
)