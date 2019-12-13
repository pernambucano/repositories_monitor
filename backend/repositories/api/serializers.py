from rest_framework import serializers

from repositories.models import Repository, Commit

class RepositorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Repository
        fields =  '__all__'

class CommitSerializer(serializers.ModelSerializer):
    repository = serializers.StringRelatedField()

    class Meta:
        model = Commit
        fields = '__all__'

