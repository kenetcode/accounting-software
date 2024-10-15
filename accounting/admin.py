# Importar los modelos de la aplicacion accounting
from django.contrib import admin
from .models import Usuario

# Registrar los modelos de la aplicacion accounting en el administrador de Django
admin.site.register(Usuario)

# Register your models here.
