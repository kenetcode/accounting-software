# importaciones necesarias para trabajar con las vistas de la aplicacion accounting 
from django.contrib.auth import authenticate, login
from django.http import JsonResponse, HttpResponse
from django.shortcuts import get_object_or_404, render, redirect
#from .models import Cliente, Servicio, Venta esta importacion es importante cuando trabaje con los modelos y necesite hacer consultas a la base de datos
from django.contrib.auth.decorators import login_required 

# Create your views here.
