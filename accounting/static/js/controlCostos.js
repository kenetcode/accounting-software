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
    const departamento = document.getElementById("departamento").value;

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
            'dias': dias,
            'departamento': departamento
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
                <td>$${parseFloat(data.salarioDiarioEmpleado).toFixed(2)}</td>
                <td>$${parseFloat(data.costo_real).toFixed(2)}</td>
                <td>$${parseFloat(data.septimo_dia).toFixed(2)}</td>
                <td>$${parseFloat(data.vacaciones).toFixed(2)}</td>
                <td>$${parseFloat(data.aguinaldo).toFixed(2)}</td>
                <td>$${parseFloat(data.isss).toFixed(2)}</td>
                <td>$${parseFloat(data.afp).toFixed(2)}</td>
                <td>$${parseFloat(data.incaff).toFixed(2)}</td>
                <td>$${parseFloat(data.salario_total).toFixed(2)}</td>
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
    document.getElementById("departamento").value = "";
}
