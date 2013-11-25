from django.conf.urls import patterns, include, url

urlpatterns = patterns('',
    url(r'^event/', include('api.event.urls')),
)