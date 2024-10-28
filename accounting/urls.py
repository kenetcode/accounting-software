from django.urls import path
from . import views
app_name = 'accounting'
urlpatterns = [
    path('', views.home_view, name='home'),
    path('login/', views.login_view, name='login'),
    path('catalogo/', views.catalogo_view, name='catalogo'),
]