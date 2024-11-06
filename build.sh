#!/usr/bin/env bash
# Exit on error
set -o errexit

# Modify this line as needed for your package manager (pip, poetry, etc.)
pip install -r requirements.txt

# Create and apply migrations
python manage.py makemigrations
python manage.py migrate

# Eliminar todas las tablas de la base de datos
python manage.py shell <<EOF
from django.db import connection
from django.apps import apps

models = apps.get_models()
with connection.cursor() as cursor:
    for model in models:
        table_name = model._meta.db_table
        cursor.execute(f"DROP TABLE IF EXISTS {table_name} CASCADE;")
EOF

# Create and apply migrations again after dropping tables
python manage.py makemigrations
python manage.py migrate

# Truncate all tables in the database
python manage.py shell <<EOF
from django.db import connection
with connection.cursor() as cursor:
    cursor.execute("TRUNCATE TABLE accounting_cuentasdetalle, accounting_cuentasmayor, accounting_transaccion, accounting_balancedecomprobacion, accounting_empleado RESTART IDENTITY CASCADE;")
EOF

# Convert static asset files
python manage.py collectstatic --no-input

# Run the script to add data to the models
python manage.py runscript crear_cuentas

python manage.py runscript crear_departamentos

# Create a superuser if it doesn't exist
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

