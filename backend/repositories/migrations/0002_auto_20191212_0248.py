# Generated by Django 2.2.8 on 2019-12-12 02:48

import datetime
from django.db import migrations, models
import django.db.models.deletion
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('repositories', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='repository',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2019, 12, 12, 2, 48, 23, 424330, tzinfo=utc)),
        ),
        migrations.CreateModel(
            name='Contributor',
            fields=[
                ('id', models.BigIntegerField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255, null=True)),
                ('email', models.EmailField(max_length=254, null=True)),
                ('login', models.CharField(max_length=255)),
                ('commits', models.IntegerField(default=0, null=True)),
                ('line_code', models.IntegerField(default=0, null=True)),
                ('issues_created', models.IntegerField(default=0, null=True)),
                ('issues_closed', models.IntegerField(default=0, null=True)),
                ('score', models.DecimalField(decimal_places=2, max_digits=9, null=True)),
                ('repository', models.ManyToManyField(to='repositories.Repository')),
            ],
        ),
        migrations.CreateModel(
            name='Commit',
            fields=[
                ('sha', models.CharField(max_length=255, primary_key=True, serialize=False)),
                ('date', models.DateTimeField()),
                ('message', models.TextField(null=True)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='repositories.Contributor')),
                ('repository', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='repositories.Repository')),
            ],
        ),
    ]
