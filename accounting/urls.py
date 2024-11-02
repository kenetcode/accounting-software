from django.urls import path
from . import views
app_name = 'accounting'
urlpatterns = [
    path('', views.home_view, name='home'),
    #Borrar despues solo servira de prueba
    #path('prueba/', views.prueba_view, name='prueba'),
    #path('cuentas/<int:id>/', views.cuentas_view, name='cuentas'),
    #Borrar
    path('login/', views.login_view, name='login'),
    path('catalogo/', views.catalogo_view, name='catalogo'),
]