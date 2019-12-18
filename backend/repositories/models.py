from django.db import models
from django.utils import timezone


class Repository(models.Model):

    id = models.AutoField(primary_key=True)
    full_name = models.CharField(max_length=255, null=False, unique=True)
    name = models.CharField(max_length=255, null=False)
    created_at = models.DateTimeField(default=timezone.now)
    organization = models.CharField(max_length=255, null=False)

    def __str__(self):
        return f"{self.full_name}"


class Commit(models.Model):
    sha = models.CharField(max_length=255, primary_key=True)
    date = models.DateTimeField()
    message = models.TextField(null=True)
    repository = models.ForeignKey("Repository", on_delete=models.CASCADE)

    class Meta:
        ordering = ["-date"]
