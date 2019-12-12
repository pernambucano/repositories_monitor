from django.urls import path

from .views import RepositoryListView, RepositoryDetailView,TestView

urlpatterns = [
    path('', RepositoryListView.as_view()),
    path('test', TestView.as_view()),
    path('<pk>', RepositoryDetailView.as_view()),
]
