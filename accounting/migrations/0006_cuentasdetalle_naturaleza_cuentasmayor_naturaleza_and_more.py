# Generated by Django 5.0.6 on 2024-11-02 05:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounting', '0005_cuentasdetalle_cuentasmayor_relacioncuentas_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='cuentasdetalle',
            name='naturaleza',
            field=models.CharField(default='test', max_length=255),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='cuentasmayor',
            name='naturaleza',
            field=models.CharField(default='test', max_length=255),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='cuentasdetalle',
            name='codigoCuenta',
            field=models.CharField(max_length=255, unique=True),
        ),
    ]
