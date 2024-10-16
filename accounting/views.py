# importaciones necesarias para trabajar con las vistas de la aplicacion accounting 
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.http import JsonResponse, HttpResponse
from django.shortcuts import get_object_or_404, render, redirect
#from .models import //Aqui van los modelos a importar # importamos el modelo Usuario de la aplicacion accounting 
from django.contrib.auth.decorators import login_required 

# Create your views here.
# Create your views here.


def home_view(request):
    return render(request, 'home.html')

@login_required 
def prueba_view(request): #Aqui se define la vista de prueba borrar despues
    return render(request, 'vistaDePrueba.html')


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
