from django.conf.urls import include, url, re_path  # noqa
from django.contrib import admin
from django.views.generic import TemplateView

import django_js_reverse.views


urlpatterns = [
    re_path(r"^admin/", admin.site.urls),
    re_path(r"^jsreverse/$", django_js_reverse.views.urls_js, name="js_reverse"),
    re_path(r"^api/login/", include("rest_social_auth.urls_token")),
    re_path(r"^api/", include("repositories.api.urls")),
    re_path(
        r"^(?:.*)/?$",
        TemplateView.as_view(template_name="repositories/index.html"),
        name="home",
    ),
]
