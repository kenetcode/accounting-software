// Función para obtener y procesar transacciones del endpoint de balance de comprobación
let totalCargos = 0;
let totalAbonos = 0;
let totalDeudor = 0;
let totalAcreedor = 0;
const fecha = document.querySelector('#fecha');

document.addEventListener('DOMContentLoaded', async function() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    fecha.value = `${year}-${month}`;
    await procesarTransacciones(year, month);
});

async function procesarTransacciones(anio, mes) {
    try {
        // Resetear totales
        totalCargos = 0;
        totalAbonos = 0;
        totalDeudor = 0;
        totalAcreedor = 0;
        
        // Obtener datos del endpoint de Django
        const response = await fetch(`/balancecomprobacion/${anio}/${mes}`);
        const transacciones = await response.json();
        console.log("Transacciones recibidas:", transacciones);
        
        // Verificar si hay transacciones
        if (!transacciones || transacciones.length === 0) {
            console.log("No hay transacciones para este período");
            document.getElementById('tabla-resultados').innerHTML = '<tr><td colspan="6" style="text-align:center;">No hay datos disponibles para este período</td></tr>';
            colocarTabla();
            return;
        }
        
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
        document.getElementById('tabla-resultados').innerHTML = '<tr><td colspan="6" style="text-align:center; color: red;">Error al cargar los datos</td></tr>';
    }
}

// Función para renderizar resultados en la tabla HTML
function renderResultados(resultados) {
    const tablaResultados = document.getElementById('tabla-resultados');
    tablaResultados.innerHTML = ""; // Limpiar resultados anteriores

    resultados.forEach(resultado => {
        let saldoDeudor = 0;
        let saldoAcreedor = 0;
        
        // Calcular saldos deudor y acreedor
        if(resultado.TotalCargos > resultado.TotalAbonos){
            saldoDeudor = resultado.TotalCargos - resultado.TotalAbonos;
        }else if(resultado.TotalCargos < resultado.TotalAbonos){
            saldoAcreedor = resultado.TotalAbonos - resultado.TotalCargos;
        }
        
        // Sumar TODAS las cuentas a los totales
        totalCargos += resultado.TotalCargos;
        totalAbonos += resultado.TotalAbonos;
        totalDeudor += saldoDeudor;
        totalAcreedor += saldoAcreedor;
        
        // Color: negro para cuentas mayores, azul para cuentas de detalle
        const color = resultado.Codigo.length < 5 ? 'black' : 'blue';
        
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
    const [anio, mes] = fecha.value.split('-');
    await procesarTransacciones(anio, mes);
});
