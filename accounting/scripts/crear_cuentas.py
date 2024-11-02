from accounting.models import CuentasMayor, CuentasDetalle
""" 
#Ejemplo de agrega una cuenta de mayor, y varias de detalle asociadas a la de mayor
#O solo agregar las cuenta de mayor en caso de que no existan de detalle
def run():
    # Crear una cuenta de mayor
    cuenta_mayor1 = CuentasMayor.objects.create(
        codigoCuenta="1001",
        nombreCuenta="Activo",
        naturaleza="Deudora"
    )

    # Crear cuentas de detalle asociadas a la cuenta de mayor
    CuentasDetalle.objects.create(
        codigoCuentaMayor=cuenta_mayor1,
        codigoCuenta="100101",
        nombreCuenta="Caja",
        naturaleza="Deudora"
    )

    CuentasDetalle.objects.create(
        codigoCuentaMayor=cuenta_mayor1,
        codigoCuenta="100102",
        nombreCuenta="Bancos",
        naturaleza="Deudora"
    )

    # Consultar cuentas de detalle asociadas a una cuenta de mayor
    cuentas_detalle = cuenta_mayor1.cuentasdetalle_set.all()
    for cuenta in cuentas_detalle:
        print(cuenta.nombreCuenta)
 """

