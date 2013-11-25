from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

# Uncomment the next two lines to enable the admin:

urlpatterns = patterns('',
<<<<<<< HEAD
    url(r'^admin/', include(admin.site.urls)),
    #url(r'', include('social.apps.django_app.urls', namespace='social')),
    #url(r'', include('core.urls')),
=======
    url(r'', include('social.apps.django_app.urls', namespace='social')),
    url(r'', include('core.urls')),
    url(r'^api/', include('api.urls')),
    url(r'^event/', include('event.urls')),
>>>>>>> 0ffae05cca871ad5e1da17de5832adb759adc4c4
    # Examples:
    # url(r'^$', 'ticketz.views.home', name='home'),
    # url(r'^ticketz/', include('ticketz.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    
)
