from django.db import models
from django.utils import timezone

class Repository(models.Model):
    id = models.AutoField(primary_key=True)
    full_name = models.CharField(max_length=255, null=False, unique=True)
    name = models.CharField(max_length=255, null=False)
    created_at = models.DateTimeField(default=timezone.now())
