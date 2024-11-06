// Selecciona el elemento de fecha del DOM
const fecha = document.querySelector('#fecha');
let totalCargos = 0;
let totalAbonos = 0;

document.addEventListener('DOMContentLoaded', async function() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    fecha.value = `${year}-${month}`;
    const tablaResultados = document.getElementById('tabla-resultados');
    tablaResultados.innerHTML = ""; // Limpiar resultados anteriores
    const utilidad = await obtenerUtilidad(year, month);
    await procesarTransacciones(year, month, utilidad);
});

// Función asincrónica para obtener la utilidad o pérdida de un año y mes específicos
async function obtenerUtilidad(anio, mes) {
    try {
        // Obtener datos del endpoint de Django
        const response = await fetch(`/estadoresultados/${anio}/${mes}`);
        const utilidad = await response.json();
        return (utilidad.utilidad_perdida)
        // En este caso, el endpoint ya devuelve los datos agrupados y con totales
    } catch (error) {
        console.error("Error al procesar transacciones:", error);
    }
}

// Función asincrónica para procesar las transacciones de un año y mes específicos
procesarTransacciones = async (anio, mes, utilidad_perdida) => {
    try {
        // Obtener datos del endpoint de Django
        const response = await fetch(`/balancecomprobacion/${anio}/${mes}`);
        const transacciones = await response.json();
        console.log(transacciones);
        let codigoCuenta = transacciones[0].codigoCuenta;
        colocarEncabezados(codigoCuenta);
        transacciones.forEach(transaccion => {
            if(transaccion.codigoCuenta[0] != codigoCuenta[0]){
                codigoCuenta = transaccion.codigoCuenta;
                colocarEncabezados(codigoCuenta);
            }else if(transaccion.codigoCuenta[0] == 2 && transaccion.codigoCuenta[1] != codigoCuenta[1]){
                codigoCuenta = transaccion.codigoCuenta;
                colocarEncabezados(codigoCuenta);
            }
            imprimirTabla(transaccion, utilidad_perdida);
        });
        // En este caso, el endpoint ya devuelve los datos agrupados y con totales
    } catch (error) {
        console.error("Error al procesar transacciones:", error);
    }
}

// Agrega un evento al elemento de fecha para que al cambiar, procese las transacciones del año y mes seleccionados
fecha.addEventListener('change', async () => {
    const [anio, mes] = fecha.value.split('-');
    console.log(anio, mes);
    totalCargos = 0;
    totalAbonos = 0;
    const tablaResultados = document.getElementById('tabla-resultados');
    tablaResultados.innerHTML = ""; // Limpiar resultados anteriores
    const utilidad_perdida = await obtenerUtilidad(anio, mes);
    await procesarTransacciones(anio, mes, utilidad_perdida);
});

async function imprimirTabla(resultado, utilidad_perdida) {
    const tablaResultados = document.getElementById('tabla-resultados');
    let saldoDeudor = 0;
    let saldoAcreedor = 0;
    if (resultado.total_cargo > resultado.total_abono) {
        saldoDeudor = resultado.saldo;
    } else if (resultado.total_cargo < resultado.total_abono) {
        saldoAcreedor = resultado.saldo;
    }
    if (resultado.codigoCuenta < 4000) {
        totalCargos += saldoDeudor;
        totalAbonos += saldoAcreedor;
        if (resultado.nombreCuenta == 'Capital social') {
            const fila = document.createElement('tr');
            totalAbonos += utilidad_perdida;
            fila.innerHTML = `
            <td>${resultado.codigoCuenta}</td>
            <td>${resultado.nombreCuenta}</td>
            <td>$${saldoDeudor.toFixed(2)}</td>
            <td>$${(saldoAcreedor + utilidad_perdida).toFixed(2)}</td>
            `;
            tablaResultados.appendChild(fila);
        } else {
            const fila = document.createElement('tr');
            fila.innerHTML = `
            <td>${resultado.codigoCuenta}</td>
            <td>${resultado.nombreCuenta}</td>
            <td>$${saldoDeudor.toFixed(2)}</td>
            <td>$${saldoAcreedor.toFixed(2)}</td>
            `;
            tablaResultados.appendChild(fila);
        }
    }
    totalTabla();
}

async function totalTabla() {
    const totalCargo = document.getElementById('total-cargo');
    const totalAbono = document.getElementById('total-abono');
    totalCargo.textContent = `$${totalCargos.toFixed(2)}`;
    totalAbono.textContent = `$${totalAbonos.toFixed(2)}`;

}

function colocarEncabezados(codigoCuenta){
    const tablaResultados = document.getElementById('tabla-resultados');
    if(codigoCuenta[0] == 1){
        const fila = document.createElement('tr');
            fila.innerHTML = `
            <td colspan="2" style="font-weight: bold; text-align:center;">Activo Corriente</td>
            <td></td>
            <td></td>
            `;
        tablaResultados.appendChild(fila);
    }
    if(codigoCuenta[0] == 2 && codigoCuenta[1] == 1){
        const fila = document.createElement('tr');
            fila.innerHTML = `
            <td colspan="2" style="font-weight: bold; text-align:center;">Pasivo Corriente</td>
            <td></td>
            <td></td>
            `;
        tablaResultados.appendChild(fila);
    }
    if(codigoCuenta[0] == 2 && codigoCuenta[1] == 2){
        const fila = document.createElement('tr');
            fila.innerHTML = `
            <td colspan="2" style="font-weight: bold; text-align:center;">Pasivo No Corriente</td>
            <td></td>
            <td></td>
            `;
        tablaResultados.appendChild(fila);
    }
    if(codigoCuenta[0] == 3){
        const fila = document.createElement('tr');
            fila.innerHTML = `
            <td colspan="2" style="font-weight: bold; text-align:center;">Capital</td>
            <td></td>
            <td></td>
            `;
        tablaResultados.appendChild(fila);
    }
}