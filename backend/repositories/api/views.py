from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions

from repositories.models import Repository, Commit
from .serializers import RepositorySerializer, CommitSerializer
from repositories.services import get_repo_info, save_repo, get_commits, save_commits

from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync


class RepositoryListView(ListAPIView):
    queryset = Repository.objects.all()
    serializer_class = RepositorySerializer


class RepositoryDetailView(RetrieveAPIView):
    queryset = Repository.objects.all()
    serializer_class = RepositorySerializer


class CommitListView(ListAPIView):
    model = Commit
    serializer_class = CommitSerializer

    def get_queryset(self):
        user = self.request.user
        social = user.social_auth.get(provider="github")
        access_token = social.extra_data["access_token"]

        print(self.request.query_params.get("repository-name", None))
        repository_name = self.request.query_params.get("repository-name", None)

        repo_request = get_repo_info(repository_name, access_token)
        repo = save_repo(repo_request)

        commits_request = get_commits(
            repository_name, access_token
        )  # TODO singleton for github?
        save_commits(commits_request, repo)

        return Commit.objects.filter(repository=repo.id)


class TestView(APIView):
    def get(self, request, format=None):
        cl = get_channel_layer()
        async_to_sync(cl.group_send)("pernambucano_catinabox",
            {
                "type": "repo.message",
                "repo_id": "pernambucano/catinabox",
                "username": "",
                "message":"it works!",
            })

        return Response({"ok": True})

