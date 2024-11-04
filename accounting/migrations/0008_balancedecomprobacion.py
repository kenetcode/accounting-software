# Generated by Django 5.0.6 on 2024-11-04 03:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounting', '0007_delete_relacioncuentas_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='BalanceDeComprobacion',
            fields=[
                ('codigoTransaccion', models.AutoField(primary_key=True, serialize=False)),
                ('numeroPartida', models.IntegerField()),
                ('fecha', models.DateField()),
                ('codigoCuenta', models.CharField(max_length=255)),
                ('nombreCuenta', models.CharField(max_length=255)),
                ('Cargo', models.FloatField()),
                ('Abono', models.FloatField()),
            ],
        ),
    ]