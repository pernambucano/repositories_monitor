import os
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from repositories.consumers import RepositoryConsumer
from channels.security.websocket import AllowedHostsOriginValidator
from django.urls import path

os.environ.setdefault(
    "DJANGO_SETTINGS_MODULE", "repositories_monitor.settings.production"
)
application = ProtocolTypeRouter(
    {
        "websocket": AllowedHostsOriginValidator(
            AuthMiddlewareStack(URLRouter([path("ws/repository", RepositoryConsumer)]))
        )
    }
)
