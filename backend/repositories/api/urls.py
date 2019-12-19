from django.urls import path

from .views import RepositoryListView, RepositoryDetailView, CommitListView, WebhookView

urlpatterns = [
    path("", RepositoryListView.as_view()),
    path("commits", CommitListView.as_view()),
    path("webhook", WebhookView.as_view()),
    path("<pk>", RepositoryDetailView.as_view()),
]
