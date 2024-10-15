from django.urls import path
from . import views
app_name = 'accounting'
urlpatterns = [
    path('login/', views.login, name='login'),
    path('', views.home_view, name='home'),
]