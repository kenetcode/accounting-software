from django.urls import path
from . import views
app_name = 'accounting'
urlpatterns = [
    path('', views.home_view, name='home'),
    path('login/', views.login_view, name='login'),
    path('prueba/', views.prueba_view, name='prueba'), #Aqui se define la ruta de la vista de prueba borrar despues
]