# Generated by Django 5.0.6 on 2024-10-28 03:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounting', '0002_alter_usuario_nombre'),
    ]

    operations = [
        migrations.CreateModel(
            name='Catalogo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('codigo', models.CharField(max_length=255, unique=True)),
                ('cuenta', models.CharField(max_length=255)),
                ('naturaleza', models.CharField(max_length=255)),
            ],
        ),
    ]
