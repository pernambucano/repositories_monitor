# Generated by Django 2.2.8 on 2019-12-19 01:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('repositories', '0009_merge_20191216_1846'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='commit',
            options={'ordering': ['-date']},
        ),
    ]
