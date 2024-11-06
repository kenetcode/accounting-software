#!/usr/bin/env bash
# Exit on error
set -o errexit

# Modify this line as needed for your package manager (pip, poetry, etc.)
pip install -r requirements.txt

# Eliminar todas las tablas de la base de datos
python manage.py shell <<EOF
from django.db import connection
from django.apps import apps

models = apps.get_models()
with connection.cursor() as cursor:
    cursor.execute("SET CONSTRAINTS ALL DEFERRED;")
    for model in models:
        table_name = model._meta.db_table
        cursor.execute(f"DROP TABLE IF EXISTS {table_name} CASCADE;")
EOF

# Crear y aplicar migraciones
python manage.py makemigrations
python manage.py migrate

# Convertir archivos de activos estáticos
python manage.py collectstatic --no-input

# Ejecutar script para agregar datos a los modelos
python manage.py runscript crear_cuentas
python manage.py runscript crear_departamentos

# Crear un superusuario si no existe
python manage.py shell <<EOF
import os
from django.contrib.auth import get_user_model
User = get_user_model()
username = os.environ.get('DJANGO_SUPERUSER_USERNAME', 'admin')
email = os.environ.get('DJANGO_SUPERUSER_EMAIL', 'admin@gmail.com')
password = os.environ.get('DJANGO_SUPERUSER_PASSWORD', 'admin')
if not User.objects.filter(username=username).exists():
    User.objects.create_superuser(username, email, password)
EOF