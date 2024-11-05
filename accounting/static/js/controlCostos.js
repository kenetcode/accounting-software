function abrirModal() {
    // Mostrar el modal
    document.getElementById("modalEmpleado").style.display = "block";
}

function cerrarModal() {
    // Ocultar el modal
    document.getElementById("modalEmpleado").style.display = "none";
}

// Cerrar el modal al hacer clic fuera del contenido
window.onclick = function (event) {
    const modal = document.getElementById("modalEmpleado");
    if (event.target === modal) {
        cerrarModal();
    }
}

document.querySelector('.btn-guardar').addEventListener('click', function (event) {
    event.preventDefault();

    // Obtener valores de los campos del formulario
    const nombre = document.getElementById("nombreEmpleado").value;
    const puesto = document.getElementById("puestoTrabajo").value;
    const salario = document.getElementById("salario").value;
    const dias = document.getElementById("dias").value;

    // Enviar datos al backend con fetch
    fetch('/agregarempleado/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value
        },
        body: new URLSearchParams({
            'nombreEmpleado': nombre,
            'puestoTrabajo': puesto,
            'salario': salario,
            'dias': dias
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error(data.error);
            } else {
                // Actualizar la tabla con los datos del nuevo empleado
                const table = document.querySelector('.control-costos-table tbody');
                const row = table.insertRow();

                row.innerHTML = `
                <td>${data.nombreEmpleado}</td>
                <td>${data.puestoEmpleado}</td>
                <td>${data.salarioDiarioEmpleado}</td>
                <td>${data.costo_real}</td>
                <td>${data.septimo_dia}</td>
                <td>${data.vacaciones}</td>
                <td>${data.aguinaldo}</td>
                <td>${data.isss}</td>
                <td>${data.afp}</td>
                <td>${data.incaff}</td>
                <td>${data.salario_total}</td>
                <td><button class="two-btn" value="${data.codigoEmpleado}" onclick="eliminarEmpleado(this)">Eliminar</button></td>
            `;
                limpiarCamposFormulario();
                cerrarModal();
            }
        })
        .catch(error => console.error('Error:', error));
});

eliminarEmpleado = async (button) => {
    const response = await fetch(`/eliminar_empleado/${button.value}`)
    const respuesta = await response.json()
    location.reload();
}

function limpiarCamposFormulario() {
    document.getElementById("nombreEmpleado").value = "";
    document.getElementById("puestoTrabajo").value = "";
    document.getElementById("salario").value = "";
    document.getElementById("dias").value = "";
}
