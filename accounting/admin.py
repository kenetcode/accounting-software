# Importar los modelos de la aplicacion accounting
from django.contrib import admin
from .models import CuentasMayor, CuentasDetalle, RelacionCuentas, Transaccion

# Register your models here.
admin.site.register(CuentasMayor)
admin.site.register(CuentasDetalle)
admin.site.register(RelacionCuentas)
admin.site.register(Transaccion)