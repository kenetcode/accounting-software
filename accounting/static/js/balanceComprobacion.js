// Función para obtener y procesar transacciones del endpoint de balance de comprobación
let totalCargos = 0;
let totalAbonos = 0;
let totalDeudor = 0;
let totalAcreedor = 0;
const fecha = document.querySelector('#fecha');

async function procesarTransacciones(anio, mes) {
    try {
        // Obtener datos del endpoint de Django
        const response = await fetch(`/balancecomprobacion/${anio}/${mes}`);
        const transacciones = await response.json();
        console.log(transacciones);
        // En este caso, el endpoint ya devuelve los datos agrupados y con totales
        const resultados = transacciones.map(cuenta => {
            return {
                Codigo: cuenta.codigoCuenta,
                NombreCuenta: cuenta.nombreCuenta,
                TotalCargos: cuenta.total_cargo,
                TotalAbonos: cuenta.total_abono,
                saldo: cuenta.saldo
            };
        });

        // Renderizamos los resultados en la tabla
        renderResultados(resultados);

    } catch (error) {
        console.error("Error al procesar transacciones:", error);
    }
}

// Función para renderizar resultados en la tabla HTML
function renderResultados(resultados) {
    const tablaResultados = document.getElementById('tabla-resultados');
    tablaResultados.innerHTML = ""; // Limpiar resultados anteriores

    resultados.forEach(resultado => {
        let saldoDeudor = 0;
        let saldoAcreedor = 0;
        let color = 'blue';
        if(resultado.TotalCargos > resultado.TotalAbonos){
            saldoDeudor = resultado.TotalCargos - resultado.TotalAbonos;
        }else if(resultado.TotalCargos < resultado.TotalAbonos){
            saldoAcreedor = resultado.TotalAbonos - resultado.TotalCargos;
        }
        if(resultado.Codigo.length < 5){
            totalCargos += resultado.TotalCargos;
            totalAbonos += resultado.TotalAbonos;
            totalDeudor += saldoDeudor;
            totalAcreedor += saldoAcreedor;
            color = 'black';
        }
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${resultado.Codigo}</td>
            <td>${resultado.NombreCuenta}</td>
            <td>$${resultado.TotalCargos.toFixed(2)}</td>
            <td>$${resultado.TotalAbonos.toFixed(2)}</td>
            <td>$${saldoDeudor.toFixed(2)}</td>
            <td>$${saldoAcreedor.toFixed(2)}</td>
        `;
        fila.style.color = color;
        tablaResultados.appendChild(fila);
    });
    colocarTabla();
}

function colocarTabla() {
    document.getElementById('total-cargo').textContent = `$${totalCargos.toFixed(2)}`;
    document.getElementById('total-abono').textContent = `$${totalAbonos.toFixed(2)}`;
    document.getElementById('total-deudor').textContent = `$${totalDeudor.toFixed(2)}`;
    document.getElementById('total-acreedor').textContent = `$${totalAcreedor.toFixed(2)}`;
}

// Ejecutar procesarTransacciones cuando el DOM esté completamente cargado
/* document.addEventListener("DOMContentLoaded", () => {
    procesarTransacciones(); // Llama a la función principal cuando el DOM esté listo
}); */

fecha.addEventListener('change', async () => {
    totalCargos = 0;
    totalAbonos = 0;
    totalDeudor = 0;
    totalAcreedor = 0;
    const [anio, mes] = fecha.value.split('-');
    console.log(anio, mes); 
    await procesarTransacciones(anio, mes);
});
