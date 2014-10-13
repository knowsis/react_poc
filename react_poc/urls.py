from django.conf.urls import patterns, include, url
# from django.contrib import admin

urlpatterns = patterns('',

    url(r'^$', 'poc.views.home', name='home'),
    url(r'^data/$', 'poc.views.data', name='data'),
    # url(r'^blog/', include('blog.urls')),

    # url(r'^admin/', include(admin.site.urls)),
)
