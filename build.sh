#!/usr/bin/env bash
# Exit on error
set -o errexit

# Modify this line as needed for your package manager (pip, poetry, etc.)
pip install -r requirements.txt

# Convert static asset files
python manage.py collectstatic --no-input

# Apply any outstanding database migrations
#python manage.py makemigrations
#python manage.py migrate


# Borrar todos los datos de los modelos y restablecer los IDs
#python manage.py shell <<EOF
#from django.db import connection
#from accounting.models import CuentasMayor, CuentasDetalle, Transaccion, BalanceDeComprobacion, Departamento, Empleado, EstadoDeResultados

#models = [CuentasMayor, CuentasDetalle, Transaccion, BalanceDeComprobacion, Departamento, Empleado, EstadoDeResultados]
#with connection.cursor() as cursor:
#    for model in models:
#        table_name = model._meta.db_table
#        cursor.execute(f"TRUNCATE TABLE {table_name} RESTART IDENTITY CASCADE;")
#EOF

# Run the script to add data to the models
#python manage.py runscript crear_cuentas
#python manage.py runscript crear_departamentos

python manage.py shell -c "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.create_superuser('admin', 'admin@gmail.com', 'admin')"