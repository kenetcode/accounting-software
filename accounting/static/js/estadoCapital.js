document.addEventListener('DOMContentLoaded', async function() {
    const fechaInput = document.getElementById('fecha');
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    fechaInput.value = `${year}-${month}`;
    fechaInput.addEventListener('change', fetchEstadoCapital());

    async function fetchEstadoCapital() {
        const fecha = fechaInput.value;
        console.log(fecha);
        if (!fecha) return;

        const [year, month] = fecha.split('-');
        try {
            const response = await fetch(`/estadodecapitaldata/${year}/${month}/`);
            const data = await response.json();

            const response2 = await fetch(`/estadoresultados/${year}/${month}/`);
            const utilidad = await response2.json();

            // Verificar si la respuesta contiene un error
            if (data.error) {
                console.error("Error desde el servidor:", data.error);
                return;
            }

            console.log("Datos recibidos:", data);

            const tbody = document.getElementById('estado-capital-body');
            
            let cargo = 0;
            let abono = 0;
            if (utilidad.utilidad_perdida > 0) {
                abono = utilidad.utilidad_perdida;
            }else{
                cargo = utilidad.utilidad_perdida*-1;
            }
            tbody.innerHTML = `
                <tr>
                    <td>${data.codigo}</td>
                    <td>${data.nombre}</td>
                    <td>$${data.total_cargo.toFixed(2)}</td>
                    <td>$${data.total_abono.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>3102</td>
                    <td>Utilidad o Perdida</td>
                    <td>$${cargo}</td>
                    <td>$${abono}</td>
                </tr>
            `;

            // Actualizar los elementos HTML con los valores recibidos
            document.getElementById('total-cargo').textContent = `$${(data.total_cargo + cargo).toFixed(2)}`;
            document.getElementById('total-abono').textContent = `$${(data.total_abono + abono).toFixed(2)}`;
            document.getElementById('capital').textContent = `$${(data.total_abono + utilidad.utilidad_perdida).toFixed(2)}`;

        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    }
});
