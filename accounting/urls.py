from django.urls import path
from . import views, models

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
    path('cuentas/<int:id>/', views.cuentas_view, name='cuentas'),
    #ENDPOINTS HECHOS POR CARLOS RAUDA
    path('transacciones/<int:year>/<int:month>/', views.obtenerNumeroTransaccion_view, name='obtenerNumeroTransaccion'),
    path('registrartransacciones/', views.registrarTransaccion_view, name='registrarTransaccion'),
    path('registrarOtraTabla/', views.registrarEnBalanceDeComprobacion_view, name='registrarEnBalanceDeComprobacion'),
    #ENDPOINTS HECHOS POR CARLOS RAUDA
    #Aqui van las rutas de las vistas de estados financieros, y las vistas que van dentro de esta.
    #-------------------------------------------------------------------------------------------------------------
    path('estadosfinancieros/', views.estadosFinancieros_view, name='estadosFinancieros'),
    path('balancedecomprobacion/', views.balanceDeComprobacion_view, name='balanceDeComprobacion'),
    path('estadoderesultados/', views.estadoDeResultados_view, name='estadoDeResultados'),
    path('estadodecapital/', views.estadoDeCapital_view, name='estadoDeCapital'),
    path('balancegeneral/', views.balanceGeneral_view, name='balanceGeneral'),
    #-------------------------------------------------------------------------------------------------------------
    path('libromayor/', views.libroMayor_view, name='libroMayor'),
    path('cierrecontable/', views.cierreContable_view, name='cierreContable'),
    path('balancecomprobacion/', views.balance_de_comprobacion_data, name='balanceDeComprobacionData'),
    path('libromayorget/', views.libro_mayor_data, name='libroMayorData'),

]