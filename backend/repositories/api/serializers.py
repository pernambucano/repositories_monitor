from rest_framework import serializers

from repositories_app.models import Repository

class RepositorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Repository
        fields = ('full_name', 'name')

