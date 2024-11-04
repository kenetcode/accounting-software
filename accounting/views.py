# importaciones necesarias para trabajar con las vistas de la aplicacion accounting 
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.http import JsonResponse, HttpResponse
from django.shortcuts import get_object_or_404, render, redirect
#from .models import //Aqui van los modelos a importar # importamos el modelo Usuario de la aplicacion accounting 
from django.contrib.auth.decorators import login_required 
from .models import CuentasMayor, CuentasDetalle, Transaccion
from django.views.decorators.csrf import csrf_exempt
import json
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

@login_required
def catalogo_view(request):
    """ cuentasMayor = CuentasMayor.objects.all()
    cuentasDetalle = CuentasDetalle.objects.all() """
    cuentasMayor = CuentasMayor.objects.all()
    for cuenta in cuentasMayor:
        cuenta.cuentas_detalle = CuentasDetalle.objects.filter(codigoCuentaMayor_id=cuenta.codigoCuentaMayor)
    return render(request, 'catalogo.html', {'cuentas': cuentasMayor})

def controlCostos_view(request):
    return render(request, 'controlCostos.html')

def transacciones_view(request):
    cuentasMayor = CuentasMayor.objects.all()
    for cuenta in cuentasMayor:
        cuenta.cuentas_detalle = CuentasDetalle.objects.filter(codigoCuentaMayor_id=cuenta.codigoCuentaMayor)
    return render(request,'transacciones.html', {'catalogos': cuentasMayor})

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

#Aqui van los objetos de las tablas de las cuentas de mayor y detalle, se crean con el script crear_cuentas.py

