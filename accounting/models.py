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
    codigoCuentaMayor = models.ForeignKey(CuentasMayor, on_delete=models.CASCADE)
    codigoCuentaDetalle = models.AutoField(primary_key=True)
    codigoCuenta = models.CharField(max_length=255, unique=True)
    nombreCuenta = models.CharField(max_length=255)
    naturaleza = models.CharField(max_length=255)

class Transaccion(models.Model):
    codigoTransaccion = models.AutoField(primary_key=True)
    numeroPartida = models.IntegerField()
    fecha = models.DateField()
    codigoCuenta = models.CharField(max_length=255)
    nombreCuenta = models.CharField(max_length=255)
    Cargo = models.FloatField()
    Abono = models.FloatField()

class BalanceDeComprobacion(models.Model):
    codigoTransaccion = models.AutoField(primary_key=True)
    numeroPartida = models.IntegerField()
    fecha = models.DateField()
    codigoCuenta = models.CharField(max_length=255)
    nombreCuenta = models.CharField(max_length=255)
    Cargo = models.FloatField()
    Abono = models.FloatField()

class Departamento(models.Model):
    codigoDepartamento = models.AutoField(primary_key=True)
    nombreDepartamento = models.CharField(max_length=255)

class Empleado(models.Model):
    codigoEmpleado = models.AutoField(primary_key=True)
    nombreEmpleado = models.CharField(max_length=255)
    puestoEmpleado = models.CharField(max_length=255)
    salarioDiarioEmpleado = models.FloatField()
    diasTrabajadosEmpleado = models.IntegerField()
    codigoDepartamento = models.ForeignKey(Departamento, on_delete=models.CASCADE)

class EstadoDeResultados(models.Model):
    codigoEstadoDeResultado = models.AutoField(primary_key=True)
    fecha = models.DateField()
    utilidadPerdida = models.FloatField()