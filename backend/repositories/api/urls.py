from django.urls import path

from .views import RepositoryListView, RepositoryDetailView, CommitListView, TestView

urlpatterns = [
    path("", RepositoryListView.as_view()),
    path("commits", CommitListView.as_view()),
    path("test", TestView.as_view()),
    path("<pk>", RepositoryDetailView.as_view()),
]
