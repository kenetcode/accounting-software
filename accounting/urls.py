from django.urls import path
from . import views
from .views import crear_cuentas

app_name = 'accounting'
urlpatterns = [
    path('', views.home_view, name='home'),
    #Borrar despues solo servira de prueba
    #path('prueba/', views.prueba_view, name='prueba'),
    #path('cuentas/<int:id>/', views.cuentas_view, name='cuentas'),
    #Borrar
    path('login/', views.login_view, name='login'),
    path('catalogo/', views.catalogo_view, name='catalogo'),
    path('controldecostos/', views.controlCostos_view, name='controlCostos'),
    path('transacciones/', views.transacciones_view, name='transacciones'),
    #Aqui van las rutas de las vistas de estados financieros, y las vistas que van dentro de esta.
    #-------------------------------------------------------------------------------------------------------------
    path('estadosfinancieros/', views.estadosFinancieros_view, name='estadosFinancieros'),
    
    #-------------------------------------------------------------------------------------------------------------
    path('libromayor/', views.libroMayor_view, name='libroMayor'),
    path('cierrecontable/', views.cierreContable_view, name='cierreContable'),
    path('crear_cuentas/', crear_cuentas, name='crear_cuentas'),
]