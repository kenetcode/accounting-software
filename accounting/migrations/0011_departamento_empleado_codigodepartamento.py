# Generated by Django 5.0.6 on 2024-11-06 02:12

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounting', '0010_merge_0009_empleado_0009_empleado_estadoderesultados'),
    ]

    operations = [
        migrations.CreateModel(
            name='Departamento',
            fields=[
                ('codigoDepartamento', models.AutoField(primary_key=True, serialize=False)),
                ('nombreDepartamento', models.CharField(max_length=255)),
            ],
        ),
        migrations.AddField(
            model_name='empleado',
            name='codigoDepartamento',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='accounting.departamento'),
            preserve_default=False,
        ),
    ]