document.addEventListener('DOMContentLoaded', function() {
    const fechaInput = document.getElementById('fecha');
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    fechaInput.value = `${year}-${month}`;

    async function fetchEstadoResultados() {
        const fecha = fechaInput.value;
        if (!fecha) return;

        try {
            const [year, month] = fecha.split('-');
            console.log(`Obteniendo estado de resultados para ${year}/${month}`);
            
            const response = await fetch(`/estadoresultados/${year}/${month}/`);
            const data = await response.json();

            console.log("Datos recibidos:", data);

            // Actualizar totales
            const totalCargoElement = document.getElementById('total-cargo');
            const totalAbonoElement = document.getElementById('total-abono');
            const utilidadElement = document.getElementById('utilidad-perdida');
            
            if (totalCargoElement) {
                totalCargoElement.textContent = `$${data.gastos.toFixed(2)}`;
            }
            if (totalAbonoElement) {
                totalAbonoElement.textContent = `$${data.ingresos.toFixed(2)}`;
            }
            if (utilidadElement) {
                utilidadElement.textContent = `$${data.utilidad_perdida.toFixed(2)}`;
            }

            // Actualizar tabla
            const tbody = document.getElementById('estado-resultados-body');
            if (tbody && data.cuentas && data.cuentas.length > 0) {
                tbody.innerHTML = data.cuentas.map(cuenta => `
                    <tr>
                        <td>${cuenta.codigoCuenta}</td>
                        <td>${cuenta.nombreCuenta}</td>
                        <td>$${cuenta.total_cargo.toFixed(2)}</td>
                        <td>$${cuenta.total_abono.toFixed(2)}</td>
                    </tr>
                `).join('');
            } else {
                tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;">No hay datos disponibles para este período</td></tr>';
            }
        } catch (error) {
            console.error("Error al obtener estado de resultados:", error);
        }
    }

    // Event listener para cambio de fecha
    fechaInput.addEventListener('change', fetchEstadoResultados);

    // Llamar a la función al cargar la página
    fetchEstadoResultados();
});
