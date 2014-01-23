from django.conf.urls import patterns, url

import api.event.views as views

urlpatterns = patterns('',
    url(r'^create$', views.CreateView.as_view(), name="api_event_create"),
    url(r'^list$', views.ListView.as_view(), name="api_event_list"),
    url(r'^delete$', views.DeleteView.as_view(), name="api_event_delete"),
    url(r'^update$', views.UpdateView.as_view(), name="api_event_update"),
    url(r'^upload-banner$', views.UploadBannerView.as_view(), name="api_event_upload_banner"),
    url(r'^delete-banner$', views.DeleteBannerView.as_view(), name="api_event_delete_banner"),
    url(r'^publish$', views.PublishView.as_view(), name="api_event_publish"),
    url(r'^unpublish$', views.UnpublishView.as_view(), name="api_event_unpublish"),
)
