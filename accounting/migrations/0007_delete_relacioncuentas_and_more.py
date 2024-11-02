# Generated by Django 5.0.6 on 2024-11-02 15:41

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounting', '0006_cuentasdetalle_naturaleza_cuentasmayor_naturaleza_and_more'),
    ]

    operations = [
        migrations.DeleteModel(
            name='RelacionCuentas',
        ),
        migrations.AddField(
            model_name='cuentasdetalle',
            name='codigoCuentaMayor',
            field=models.ForeignKey(default='323', on_delete=django.db.models.deletion.CASCADE, to='accounting.cuentasmayor'),
            preserve_default=False,
        ),
    ]