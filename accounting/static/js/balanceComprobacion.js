// Función para obtener y procesar transacciones del endpoint de balance de comprobación
async function procesarTransacciones() {
    try {
        // Obtener datos del endpoint de Django
        const response = await fetch('/balancecomprobacion/');
        const transacciones = await response.json();

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
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${resultado.Codigo}</td>
            <td>${resultado.NombreCuenta}</td>
            <td>${resultado.TotalCargos.toFixed(2)}</td>
            <td>${resultado.TotalAbonos.toFixed(2)}</td>
            <td>${resultado.saldo.toFixed(2)}</td>
        `;
        tablaResultados.appendChild(fila);
    });
}

// Ejecutar procesarTransacciones cuando el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
    procesarTransacciones(); // Llama a la función principal cuando el DOM esté listo
});
