from django.db import models

# Create your models here.

# Clase Usuario que hereda de models.Model para poder ser almacenada en la base de datos
class Usuario(models.Model):
    nombre = models.CharField(max_length=255, unique=True)
    contrasena = models.CharField(max_length=255)

    def __str__(self):
        return self.nombre

    