# Generated by Django 5.0.6 on 2024-11-01 03:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounting', '0003_catalogo'),
    ]

    operations = [
        migrations.AddField(
            model_name='catalogo',
            name='tipo',
            field=models.CharField(default='default_value', max_length=255),
            preserve_default=False,
        ),
    ]
