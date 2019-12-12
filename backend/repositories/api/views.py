from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions

from repositories_app.models import Repository
from .serializers import RepositorySerializer
from repositories_app.services import get_repo_info

class RepositoryListView(ListAPIView):
    queryset = Repository.objects.all()
    serializer_class = RepositorySerializer
    
class RepositoryDetailView(RetrieveAPIView):
    queryset = Repository.objects.all()
    serializer_class = RepositorySerializer

class TestView(APIView):
    authentication_classes = [authentication.TokenAuthentication, authentication.SessionAuthentication]
    permission_classes = [permissions.AllowAny]
    def get(self, request, format=None):
        try: 
            user = request.user
            social = user.social_auth.get(provider='github')
            access_token = social.extra_data['access_token']
            user_info, repo_info = get_repo_info(access_token)
            commit_list = [ c.commit.message for c in  repo_info.get_commits()]
            return Response({'user': user_info.login, 'commits': commit_list})
        except:
            return Response('Not Found')

