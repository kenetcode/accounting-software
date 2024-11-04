"""
URL configuration for accounting_software project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('accounting.urls')),
    #Borrar despues solo servira de prueba
    path('prueba/', include('accounting.urls')),
    path('cuentas/<int:id>/', include('accounting.urls')),
    #Borrar
    path('login/', include('accounting.urls')),
    path('catalogo/', include('accounting.urls')),
    path('controldecostos/', include('accounting.urls')),
    path('transacciones/', include('accounting.urls')),
    #ENDPOINTS HECHOS POR CARLOS RAUDA
    path('cuentas/<int:id>/', include('accounting.urls')),
    path('transacciones/<int:year>/<int:month>/', include('accounting.urls')),
    #ENDPOINTS HECHOS POR CARLOS RAUDA
    path('registrartransacciones/', include('accounting.urls')),
    path('estadosfinancieros/', include('accounting.urls')),
    path('balancedecomprobacion/', include('accounting.urls')),
    path('libromayor/', include('accounting.urls')),
    path('cierrecontable/', include('accounting.urls')),
    #Path que añadio Benitez
    path('estadoderesultados/', include('accounting.urls')),
    path('estadodecapital/', include('accounting.urls')),
    path('balancegeneral/', include('accounting.urls')),
    path('balancecomprobacion/<int:year>/<int:month>/', include('accounting.urls')),
    path('libromayorget/<int:year>/<int:month>/', include('accounting.urls')),
]
