# importaciones necesarias para trabajar con las vistas de la aplicacion accounting 
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.http import JsonResponse, HttpResponse
from django.shortcuts import get_object_or_404, render, redirect
#from .models import //Aqui van los modelos a importar # importamos el modelo Usuario de la aplicacion accounting 
from django.contrib.auth.decorators import login_required 
from .models import CuentasMayor, CuentasDetalle
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
    cuentasMayor = CuentasMayor.objects.all()
    cuentasDetalle = CuentasDetalle.objects.all()
    return render(request, 'catalogo.html', {'cuentasMayor': cuentasMayor, 'cuentasDetalle': cuentasDetalle})
