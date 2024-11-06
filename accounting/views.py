# importaciones necesarias para trabajar con las vistas de la aplicacion accounting 
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse, HttpResponse
from django.shortcuts import get_object_or_404, render, redirect
#from .models import //Aqui van los modelos a importar # importamos el modelo Usuario de la aplicacion accounting 
from django.contrib.auth.decorators import login_required 
from .models import CuentasMayor, CuentasDetalle, Transaccion, BalanceDeComprobacion, EstadoDeResultados, Empleado, Departamento 
from django.views.decorators.csrf import csrf_exempt
import json
from django.db.models import Sum, Q
from datetime import datetime
# Create your views here.
# Create your views here.

""" #Modelo de la vista para Pruebas
def prueba_view(request):
    catalogos = Catalogo.objects.all()
    return render(request, 'transacciones.html', {'catalogos': catalogos})
#Borrar """

""" def cuentas_view(request, id):
    try:
        # Obtén el objeto Catalogo específico usando el `id`
        catalogo = Catalogo.objects.get(codigo=id)
        catalogo_data = {
            "codigo": catalogo.codigo,
            "cuenta": catalogo.cuenta
        }
        return JsonResponse(catalogo_data)
    except Catalogo.DoesNotExist:
        return JsonResponse({"error": "Catalogo no encontrado"}, status=404)
#Borrar """

@login_required
def home_view(request):
    return render(request, 'home.html')


def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('/')
        else:
            return render(request, 'login.html', {'error': 'Usuario o contraseña incorrectos'})
    else:
        return render(request, 'login.html')

#Funcion para cerrar sesion
def cerrarSesion(request):
    logout(request)
    return redirect("/login")

@login_required
def catalogo_view(request):
    """ cuentasMayor = CuentasMayor.objects.all()
    cuentasDetalle = CuentasDetalle.objects.all() """
    cuentasMayor = CuentasMayor.objects.all()
    for cuenta in cuentasMayor:
        cuenta.cuentas_detalle = CuentasDetalle.objects.filter(codigoCuentaMayor_id=cuenta.codigoCuentaMayor)
    return render(request, 'catalogo.html', {'cuentas': cuentasMayor})

def controlCostos_view(request):
    empleados = Empleado.objects.all()
    empleados_data = [calcular_datos_empleado(empleado) for empleado in empleados]
    departamentos = Departamento.objects.all()
    print(departamentos)
    return render(request, 'controlCostos.html', {'empleados': empleados_data, 'departamentos': departamentos})

def transacciones_view(request):
    cuentasMayor = CuentasMayor.objects.all()
    for cuenta in cuentasMayor:
        cuenta.cuentas_detalle = CuentasDetalle.objects.filter(codigoCuentaMayor_id=cuenta.codigoCuentaMayor)
    return render(request,'transacciones.html', {'catalogos': cuentasMayor})

# SIRVE PARA RECUPERAR EL CATALOGO DE CUENTAS
def cuentas_view(request, id):
    try:
        """ catalogo_data = {
            "codigo": catalogo.codigo,
            "cuenta": catalogo.cuenta
        } """
        # Obtén el objeto Catalogo específico usando el `id`
        if(CuentasDetalle.objects.filter(codigoCuenta=id).exists()):
            cuentaDetalle = CuentasDetalle.objects.get(codigoCuenta=id)
            cuentaMayor = CuentasMayor.objects.get(codigoCuentaMayor=cuentaDetalle.codigoCuentaMayor_id)
            catalogo_data = {
                "codigo": cuentaMayor.codigoCuenta,
                "cuenta": cuentaMayor.nombreCuenta,
                "cuenta_detalle": {
                    "codigo": cuentaDetalle.codigoCuenta,
                    "cuenta": cuentaDetalle.nombreCuenta,
                }
            }
        else:
            cuentaMayor = CuentasMayor.objects.get(codigoCuenta=id)
            catalogo_data = {
                "codigo": cuentaMayor.codigoCuenta,
                "cuenta": cuentaMayor.nombreCuenta,
                "cuenta_detalle": {
                    "codigo": "",
                    "cuenta": "",
                }
            }
        return JsonResponse(catalogo_data)
    except CuentasMayor.DoesNotExist:
        return JsonResponse({"error": "Catalogo no encontrado"}, status=404)

# SIRVE PARA CALCULAR EL NUMERO DE PARTIDA
def obtenerNumeroTransaccion_view(request, year, month):
    if(Transaccion.objects.filter(fecha__year=year, fecha__month=month).exists()):
        transacciones = Transaccion.objects.filter(fecha__year=year, fecha__month=month)
        ultima_transaccion = transacciones.last()
        numero = {
            "numero": ultima_transaccion.numeroPartida + 1
        }
    else:
        numero = {
            "numero": 1
        }
        print(numero)
    return JsonResponse(numero)

# SIRVE PARA REGISTRAR UNA TRANSACCION
def registrarTransaccion_view(request):
    if request.method == 'POST':
        try:
            datos = json.loads(request.body)
            transaccion = Transaccion(
                numeroPartida=datos['numero_partida'],
                fecha=datos['fecha'],
                codigoCuenta=datos['codigo'],
                nombreCuenta=datos['cuenta'],
                Cargo=float(datos['cargo']),
                Abono=float(datos['abono'])
            )
            transaccion.save()
            return JsonResponse({"mensaje": "Datos recibidos correctamente"})
        except Exception as e:
            return JsonResponse({'success': False, 'message': str(e)})
    else:
        return JsonResponse({"error": "Método no permitido"}, status=405)

# SIRVE PARA REGISTRAR UNA TRANSACCION EN BALANCE DE COMPROBACION
@csrf_exempt
def registrarEnBalanceDeComprobacion_view(request):
    if request.method == 'POST':
        try:
            datos = json.loads(request.body)
            balance = BalanceDeComprobacion(
                numeroPartida=datos['numero_partida'],
                fecha=datos['fecha'],
                codigoCuenta=datos['codigo'],
                nombreCuenta=datos['cuenta'],
                Cargo=float(datos['cargo']),
                Abono=float(datos['abono'])
            )
            balance.save()
            return JsonResponse({"mensaje": "Datos registrados en Balance de Comprobacion correctamente"})
        except Exception as e:
            return JsonResponse({'success': False, 'message': str(e)})
    else:
        return JsonResponse({"error": "Método no permitido"}, status=405)

#Aqui va la vista de estados financieros, y las vistas que van dentro de esta.
#-------------------------------------------------------------------------------------------------------------
def estadosFinancieros_view(request):
    return render(request, 'estadosFinancieros.html')

#Las siguientes son las sub-templates de estados financieros

def balanceDeComprobacion_view(request):
    return render(request, 'balanceComprobacion.html')

def estadoDeResultados_view(request):
    return render(request, 'estadoResultados.html')

def estadoDeCapital_view(request):
    return render(request, 'estadoCapital.html')

def balanceGeneral_view(request):
    return render(request, 'balanceGeneral.html')
#-------------------------------------------------------------------------------------------------------------

def libroMayor_view(request):
    return render(request, 'libroMayor.html')

#Esta vista es la que faltaba en el menu.
def cierreContable_view(request):
    return render(request, 'cierreContable.html')

def costosMenu_view(request):
    return render(request, 'costosMenu.html')

def costosSoftware_view(request):
    return render(request, 'costosSoftware.html')

#Aqui van los objetos de las tablas de las cuentas de mayor y detalle, se crean con el script crear_cuentas.py

#Pruebas

from django.db.models import Sum, Case, When, F

@login_required
def balance_de_comprobacion_data(request, year, month):
    transacciones = (
        BalanceDeComprobacion.objects
        .filter(fecha__year=year, fecha__month=month)
        .values("codigoCuenta", "nombreCuenta")
        .annotate(
            total_cargo=Sum("Cargo"),
            total_abono=Sum("Abono"),
            saldo=Case(
                When(total_abono__gt=F('total_cargo'), then=F('total_abono') - F('total_cargo')),
                default=F('total_cargo') - F('total_abono')
            )
        )
        .order_by("codigoCuenta")
    )

    data = list(transacciones)
    return JsonResponse(data, safe=False)

def libro_mayor_data(request, year, month):
    try:
        transacciones = (
            Transaccion.objects
            .filter(fecha__year=year, fecha__month=month)
            .values("codigoCuenta", "nombreCuenta", "fecha", "numeroPartida", "Cargo", "Abono")
            .order_by("codigoCuenta", "fecha")
        )
        data = list(transacciones)
        return JsonResponse(data, safe=False)
    except Exception as e:
        # Imprime el error en la consola y devuelve un JSON de error
        print("Error:", e)
        return JsonResponse({"error": "Error al procesar las transacciones"}, status=500)

@login_required
def estado_de_resultados_data(request, year, month):
    cuentas = BalanceDeComprobacion.objects.filter(
        fecha__year=year, fecha__month=month
    ).filter(
        Q(codigoCuenta__startswith='5101') & ~Q(codigoCuenta='510101') | Q(codigoCuenta__startswith='41')
    ).values('codigoCuenta', 'nombreCuenta').annotate(
        total_cargo=Sum('Cargo'),
        total_abono=Sum('Abono')
    )

    ingresos = sum(cuenta['total_abono'] for cuenta in cuentas if cuenta['codigoCuenta'].startswith('5101'))
    gastos = sum(cuenta['total_cargo'] for cuenta in cuentas if cuenta['codigoCuenta'].startswith('41'))

    utilidad_perdida = ingresos - gastos

    data = {
        'cuentas': list(cuentas),
        'ingresos': ingresos,
        'gastos': gastos,
        'utilidad_perdida': utilidad_perdida
    }

    return JsonResponse(data)

@csrf_exempt
def guardar_estado_resultados_view(request):
    if request.method == 'POST':
        print("POST request received")  # Agregar este print
        try:
            datos = json.loads(request.body)
            fecha_str = datos['fecha']
            utilidad_perdida = datos['utilidad_perdida']
            print("Fecha recibida:", fecha_str)
            print("Utilidad/Pérdida recibida:", utilidad_perdida)

            # Convertir la fecha de string a objeto date
            fecha = datetime.strptime(fecha_str, '%Y-%m-%d').date()

            # Verificar si ya existe un registro para el mismo mes y año
            existe_registro = EstadoDeResultados.objects.filter(fecha__year=fecha.year, fecha__month=fecha.month).exists()
            print(f"Existe registro para {fecha.month}/{fecha.year}: {existe_registro}")

            if existe_registro:
                print(f"Registro ya existe para {fecha.month}/{fecha.year}")
                return JsonResponse({
                    "mensaje": f"Ya existe un registro para el mes {fecha.month} y año {fecha.year}"
                }, status=400)

            estado_resultados = EstadoDeResultados(
                fecha=fecha,
                utilidadPerdida=utilidad_perdida
            )
            estado_resultados.save()
            print("Estado de Resultados guardado correctamente")
            return JsonResponse({"mensaje": "Estado de Resultados guardado correctamente"})
        except Exception as e:
            print("Error al guardar:", str(e))
            return JsonResponse({'success': False, 'message': str(e)}, status=500)
    else:
        return JsonResponse({"error": "Método no permitido"}, status=405)

@login_required
def estado_de_capital_data(request, year, month):
    try:
        cuenta = BalanceDeComprobacion.objects.filter(
            codigoCuenta='3101',
            fecha__year=year,
            fecha__month=month
        ).aggregate(
            total_cargo=Sum('Cargo'),
            total_abono=Sum('Abono')
        )

        # Obtener utilidadPerdida del EstadoDeResultados
        estado_resultados = EstadoDeResultados.objects.filter(
            fecha__year=year,
            fecha__month=month
        ).first()

        utilidad_perdida = estado_resultados.utilidadPerdida if estado_resultados else 0
        print("Utilidad/Pérdida:", utilidad_perdida)

        # Calcular capital actualizado con la condición
        capital_actualizado = (cuenta['total_abono'] or 0) - (cuenta['total_cargo'] or 0)
        if utilidad_perdida > 0:
            capital_actualizado += utilidad_perdida

        print("Estado de capital actualizado",capital_actualizado)

        data = {
            'codigo': '3101',
            'nombre': 'Capital',
            'total_cargo': cuenta['total_cargo'] or 0,
            'total_abono': cuenta['total_abono'] or 0,
            'utilidad_perdida': utilidad_perdida,
            'capital_actualizado': capital_actualizado
        }

        return JsonResponse(data)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

    

#Control Costos
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

# Vista para agregar un nuevo empleado mediante AJAX
@csrf_exempt
def agregar_empleado(request):
    if request.method == 'POST':
        # Recibe los datos del formulario
        nombre = request.POST.get('nombreEmpleado')
        puesto = request.POST.get('puestoTrabajo')
        salario_diario = float(request.POST.get('salario', 0))
        dias_trabajo = int(request.POST.get('dias', 0))
        codigo_departamento = request.POST.get('departamento', 0)
        print(codigo_departamento)
        # Guardar en la base de datos
        empleado = Empleado.objects.create(
            nombreEmpleado=nombre,
            puestoEmpleado=puesto,
            salarioDiarioEmpleado=salario_diario,
            diasTrabajadosEmpleado=dias_trabajo,
            codigoDepartamento_id = codigo_departamento
        )

        # Calcular y devolver los datos en JSON
        empleado_data = calcular_datos_empleado(empleado)
        return JsonResponse(empleado_data)

    return JsonResponse({'error': 'Método no permitido'}, status=400)

# Función para calcular los valores adicionales
def calcular_datos_empleado(empleado):

    costo_real = round(empleado.diasTrabajadosEmpleado * empleado.salarioDiarioEmpleado, 2)

    # Verificamos que el cálculo del séptimo día no sea negativo
    septimo_dia = round(max(0, (7 - empleado.diasTrabajadosEmpleado) * empleado.salarioDiarioEmpleado) + costo_real, 2)

    # Cálculo de vacaciones con una constante de 15 días y recargo de 30%, dividido entre 52 semanas
    vacaciones = round(((empleado.salarioDiarioEmpleado * 15) + 0.30 * (empleado.salarioDiarioEmpleado * 15)) / 52, 2)

    # Aguinaldo con una constante de 21 días, dividido entre 52 semanas
    aguinaldo = round((empleado.salarioDiarioEmpleado * 21) / 52, 2)

    # Cálculo de ISSS, AFP, e INCAFF en función de vacaciones y séptimo día
    isss = round((vacaciones + septimo_dia) * 0.0775, 2)
    afp = round((vacaciones + septimo_dia) * 0.0875, 2)
    incaff = round((vacaciones + septimo_dia) * 0.01, 2)

    # Salario total
    salario_total = round(septimo_dia + vacaciones + aguinaldo + isss + afp + incaff, 2)



    return {
        'codigoEmpleado': empleado.codigoEmpleado,
        'nombreEmpleado': empleado.nombreEmpleado,
        'puestoEmpleado': empleado.puestoEmpleado,
        'salarioDiarioEmpleado': empleado.salarioDiarioEmpleado,
        'costo_real': costo_real,
        'septimo_dia': septimo_dia,
        'vacaciones': vacaciones,  
        'aguinaldo': aguinaldo,
        'isss': isss,
        'afp': afp,
        'incaff': incaff,
        'salario_total': salario_total
    }

from django.shortcuts import redirect, get_object_or_404

def eliminar_empleado(request, codigoEmpleado):
        empleado = get_object_or_404(Empleado, codigoEmpleado=codigoEmpleado)
        empleado.delete()
        return JsonResponse({"exito":"exito"})

