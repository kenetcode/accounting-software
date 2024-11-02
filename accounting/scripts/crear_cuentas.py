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
    cuenta_mayor1 = CuentasMayor.objects.create(
        codigoCuenta="1101",
        nombreCuenta="Efectivo y Equivalentes",
        naturaleza="Activo"
    )

    cuenta_detalle = CuentasDetalle.objects.create(
        codigoCuentaMayor=cuenta_mayor1,
        codigoCuenta="110101",
        nombreCuenta="Caja",
        naturaleza="Activo"
    )

    cuenta_detalle = CuentasDetalle.objects.create(
        codigoCuentaMayor=cuenta_mayor1,
        codigoCuenta="110102",
        nombreCuenta="Bancos",
        naturaleza="Activo"
    )

    cuenta_mayor2 = CuentasMayor.objects.create(
        codigoCuenta="1102",
        nombreCuenta="Clientes y otras cuentas por cobrar ",
        naturaleza="Activo"
    )

    cuenta_detalle = CuentasDetalle.objects.create(
        codigoCuentaMayor=cuenta_mayor2,
        codigoCuenta="110201",
        nombreCuenta="Cuentas por cobrar",
        naturaleza="Activo"
    )

    cuenta_detalle = CuentasDetalle.objects.create(
        codigoCuentaMayor=cuenta_mayor2,
        codigoCuenta="110202",
        nombreCuenta="Documentos por cobrar",
        naturaleza="Activo"
    )

    cuenta_detalle = CuentasDetalle.objects.create(
        codigoCuentaMayor=cuenta_mayor2,
        codigoCuenta="110203",
        nombreCuenta="Otras cuentas por cobrar ",
        naturaleza="Activo"
    )

    cuenta_mayor3 = CuentasMayor.objects.create(
        codigoCuenta="1103",
        nombreCuenta="IVA Crédito Fiscal",
        naturaleza="Activo"
    )

    cuenta_mayor4 = CuentasMayor.objects.create(
        codigoCuenta="1104",
        nombreCuenta="Pagos adicionales",
        naturaleza="Activo"
    )

    cuenta_detalle = CuentasDetalle.objects.create(
        codigoCuentaMayor=cuenta_mayor4,
        codigoCuenta="110401",
        nombreCuenta="Suministros de oficina ",
        naturaleza="Activo"
    )

    cuenta_detalle = CuentasDetalle.objects.create(
        codigoCuentaMayor=cuenta_mayor4,
        codigoCuenta="110402",
        nombreCuenta="Alquiler de local",
        naturaleza="Activo"
    )

    cuenta_detalle = CuentasDetalle.objects.create(
        codigoCuentaMayor=cuenta_mayor4,
        codigoCuenta="110403",
        nombreCuenta="Publicidad",
        naturaleza="Activo"
    )

    cuenta_mayor5 = CuentasMayor.objects.create(
        codigoCuenta="1105",
        nombreCuenta="Deudores diversos",
        naturaleza="Activo"
    )

    cuenta_mayor6 = CuentasMayor.objects.create(
        codigoCuenta="1201",
        nombreCuenta="Inventario de software",
        naturaleza="Activo"
    )

    cuenta_mayor7 = CuentasMayor.objects.create(
        codigoCuenta="2101",
        nombreCuenta="Préstamos bancarios",
        naturaleza="Activo"
    )

    cuenta_mayor8 = CuentasMayor.objects.create(
        codigoCuenta="2102",
        nombreCuenta=" Documentos por pagar",
        naturaleza="Pasivo"
    )

    cuenta_mayor9 = CuentasMayor.objects.create(
        codigoCuenta="2103",
        nombreCuenta="Cuentas por pagar",
        naturaleza="Pasivo"
    )

    cuenta_mayor10 = CuentasMayor.objects.create(
        codigoCuenta="2104",
        nombreCuenta="IVA Débito Fiscal",
        naturaleza="Pasivo"
    )

    cuenta_mayor11 = CuentasMayor.objects.create(
        codigoCuenta="2105",
        nombreCuenta="Acreedores diversos",
        naturaleza="Pasivo"
    )

    cuenta_mayor12 = CuentasMayor.objects.create(
        codigoCuenta="2201",
        nombreCuenta=" Préstamos bancarios a largo plazo",
        naturaleza="Pasivo"
    )

    cuenta_mayor13 = CuentasMayor.objects.create(
        codigoCuenta="2202",
        nombreCuenta="Documentos por pagar a largo plazo",
        naturaleza="Pasivo"
    )
#--------------------------------------------------------------------------------
#Esta parte es de Kenet
print("Hola")




