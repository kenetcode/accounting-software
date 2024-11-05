document.addEventListener('DOMContentLoaded', function() {
    const fechaInput = document.getElementById('fecha');
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    fechaInput.value = `${year}-${month}`;

    fechaInput.addEventListener('change', fetchEstadoResultados);

    async function fetchEstadoResultados() {
        const fecha = fechaInput.value;
        if (!fecha) return;

        const [year, month] = fecha.split('-');
        const response = await fetch(`/estadoresultados/${year}/${month}/`);
        const data = await response.json();

        console.log("Datos recibidos:", data);

        document.getElementById('total-cargo').textContent = `$${data.gastos.toFixed(2)}`;
        document.getElementById('total-abono').textContent = `$${data.ingresos.toFixed(2)}`;
        document.getElementById('utilidad-perdida').textContent = `$${data.utilidad_perdida.toFixed(2)}`;

        const tbody = document.getElementById('estado-resultados-body');
        tbody.innerHTML = data.cuentas.map(cuenta => `
            <tr>
                <td>${cuenta.codigoCuenta}</td>
                <td>${cuenta.nombreCuenta}</td>
                <td>$${cuenta.total_cargo.toFixed(2)}</td>
                <td>$${cuenta.total_abono.toFixed(2)}</td>
            </tr>
        `).join('');
    }

    // Llamar a la función al cargar la página
    fetchEstadoResultados();

    // Obtener el token CSRF desde la meta etiqueta
    const csrftoken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    document.getElementById('guardar-estado-resultados').addEventListener('click', async function() {
        const fecha = fechaInput.value;
        if (!fecha) return;

        const utilidad_perdida = parseFloat(document.getElementById('utilidad-perdida').textContent.replace('$', ''));

        const data = {
            fecha: `${fecha}-01`,  // Agregar día para formar una fecha completa
            utilidad_perdida: utilidad_perdida
        };

        console.log("Datos a guardar:", data);

        try {
            const response = await fetch('/guardar_estado_resultados/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken  // Utilizar el token obtenido del meta tag
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            if (response.ok) {
                console.log(result);
                alert(result.mensaje);
            } else {
                console.error("Error:", result.message || result.error);
                alert("Error: " + (result.message || result.error));
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
            alert("Error en la solicitud: " + error.message);
        }
    });

    // Función para obtener el token CSRF
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});
