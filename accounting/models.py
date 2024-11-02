from django.db import models

# Create your models here.

#Tabla para almacenar las cuentas de mayor de la empresa
class CuentasMayor(models.Model):
    codigoCuentaMayor = models.AutoField(primary_key=True)
    codigoCuenta = models.CharField(max_length=255, unique=True)
    nombreCuenta = models.CharField(max_length=255)
    naturaleza = models.CharField(max_length=255)

#Tabla para alamacenar las cuentas de detalle de cada cuenta mayor
class CuentasDetalle(models.Model):
    codigoCuentaDetalle = models.AutoField(primary_key=True)
    codigoCuenta = models.CharField(max_length=255, unique=True)
    nombreCuenta = models.CharField(max_length=255)
    naturaleza = models.CharField(max_length=255)

#Tabla para relacionar las cuentas de mayor con las cuentas de detalle
class RelacionCuentas(models.Model):
    codigoRelacion = models.AutoField(primary_key=True)
    codigoCuentaMayor = models.CharField(max_length=255)
    codigoCuentaDetalle = models.CharField(max_length=255)

class Transaccion(models.Model):
    codigoTransaccion = models.AutoField(primary_key=True)
    numeroPartida = models.IntegerField()
    fecha = models.DateField()
    codigoCuenta = models.CharField(max_length=255)
    nombreCuenta = models.CharField(max_length=255)
    Cargo = models.FloatField()
    Abono = models.FloatField()

