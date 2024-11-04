// Función para obtener y procesar transacciones del endpoint de balance de comprobación
async function procesarTransacciones() {
    try {
        // Obtener datos del endpoint de Django
        const response = await fetch('libromayorget/');
        const transacciones = await response.json();

        // Renderizamos los resultados en la tabla
        console.log(transacciones)
        renderResultados(transacciones);
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
            <td>${resultado.fecha}</td>
            <td>${resultado.codigoCuenta}</td>
            <td>${resultado.nombreCuenta}</td>
            <td>$${resultado.Cargo}</td>
            <td>$${resultado.Abono}</td>
            <td>$${0}</td>
        `;
        tablaResultados.appendChild(fila);
    });
}

// Ejecutar procesarTransacciones cuando el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", async () => {
    procesarTransacciones(); // Llama a la función principal cuando el DOM esté listo
});
