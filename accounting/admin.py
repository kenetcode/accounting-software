# Importar los modelos de la aplicacion accounting
from django.contrib import admin
from .models import CuentasMayor, CuentasDetalle, Transaccion, BalanceDeComprobacion, Departamento, Empleado, EstadoDeResultados

# Register your models here.
admin.site.register(CuentasMayor)
admin.site.register(CuentasDetalle)
admin.site.register(Transaccion)
admin.site.register(BalanceDeComprobacion)
admin.site.register(Departamento)
admin.site.register(Empleado)
admin.site.register(EstadoDeResultados)