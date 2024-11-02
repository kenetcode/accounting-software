# Importar los modelos de la aplicacion accounting
from django.contrib import admin
from .models import CuentasMayor, CuentasDetalle, Transaccion

# Register your models here.
admin.site.register(CuentasMayor)
admin.site.register(CuentasDetalle)
admin.site.register(Transaccion)