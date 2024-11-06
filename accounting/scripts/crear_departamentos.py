from accounting.models import Departamento
def run():
    # Crear un departamento
    departamento = Departamento.objects.create(
        nombreDepartamento="Desarrollo y Tecnología"
    )
    departamento = Departamento.objects.create(
        nombreDepartamento="Consultoría y Soporte Técnico"
    )
    departamento = Departamento.objects.create(
        nombreDepartamento="Ventas y Marketing"
    )
    departamento = Departamento.objects.create(
        nombreDepartamento="Finanzas y Contabilidad"
    )
    departamento = Departamento.objects.create(
        nombreDepartamento="Recursos Humanos"
    )
    # Consultar departamentos
    departamentos = Departamento.objects.all()
    for departamento in departamentos:
        print(departamento.nombreDepartamento)