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
def run():
#Esta parte es de Carlos    
    print("Hola")


#--------------------------------------------------------------------------------
#Esta parte es de Kenet

cuenta_mayor14 = CuentasMayor.objects.create(
        codigoCuenta="3101",
        nombreCuenta="Capital social",
        naturaleza="Capital"
    )

cuenta_mayor15 = CuentasMayor.objects.create(
        codigoCuenta="3102",
        nombreCuenta="Utilidad o Pérdida",
        naturaleza="Capital"
    )

cuenta_mayor16 = CuentasMayor.objects.create(
        codigoCuenta="4101",
        nombreCuenta="Costo de venta de licencias",
        naturaleza="Gastos y costos operativos"
    )

cuenta_mayor17 = CuentasMayor.objects.create(
        codigoCuenta="4102",
        nombreCuenta="Sueldos y salarios",
        naturaleza="Gastos y costos operativos"
    )

cuenta_mayor18 = CuentasMayor.objects.create(
        codigoCuenta="4103",
        nombreCuenta="Vacaciones",
        naturaleza="Gastos y costos operativos"
    )

cuenta_mayor19 = CuentasMayor.objects.create(
        codigoCuenta="4104",
        nombreCuenta="Aguinaldo",
        naturaleza="Gastos y costos operativos"
    )

cuenta_mayor20 = CuentasMayor.objects.create(
        codigoCuenta="4105",
        nombreCuenta="Cuota patronal ISSS",
        naturaleza="Gastos y costos operativos"
    )

cuenta_mayor21 = CuentasMayor.objects.create(
        codigoCuenta="4106",
        nombreCuenta="Cuota patronal AFP",
        naturaleza="Gastos y costos operativos"
    )

cuenta_mayor22 = CuentasMayor.objects.create(
        codigoCuenta="4107",
        nombreCuenta="INCAF",
        naturaleza="Gastos y costos operativos"
    )

cuenta_mayor23 = CuentasMayor.objects.create(
        codigoCuenta="4108",
        nombreCuenta="Gastos de mantenimiento de equipos",
        naturaleza="Gastos y costos operativos"
    )

cuenta_mayor24 = CuentasMayor.objects.create(
        codigoCuenta="4109",
        nombreCuenta="Gastos de administración",
        naturaleza="Gastos y costos operativos"
    )

cuenta_mayor25 = CuentasMayor.objects.create(
        codigoCuenta="4110",
        nombreCuenta="Gastos financieros",
        naturaleza="Gastos y costos operativos"
    )

cuenta_mayor26 = CuentasMayor.objects.create(
        codigoCuenta="5101",
        nombreCuenta="Ingresos por venta de licencias de software",
        naturaleza="Ingresos por ventas de software"
    )

cuenta_detalle = CuentasDetalle.objects.create(
        codigoCuentaMayor=cuenta_mayor26,
        codigoCuenta="510101",
        nombreCuenta="Ingresos por venta directa de licencias",
        naturaleza="Ingresos por ventas de software"
    )

cuenta_mayor27 = CuentasMayor.objects.create(
        codigoCuenta="5102",
        nombreCuenta="Ingresos por venta de servicios",
        naturaleza="Ingresos por ventas de software"
    )