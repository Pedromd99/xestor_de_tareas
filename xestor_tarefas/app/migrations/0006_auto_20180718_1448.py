# -*- coding: utf-8 -*-
# Generated by Django 1.11.13 on 2018-07-18 12:48
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0005_auto_20180718_1444'),
    ]

    operations = [
        migrations.AlterField(
            model_name='notas',
            name='id_name',
            field=models.PositiveIntegerField(null=True),
        ),
    ]
