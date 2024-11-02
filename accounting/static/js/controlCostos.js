function abrirModal() {
    // Mostrar el modal
    document.getElementById("modalEmpleado").style.display = "block";
}

function cerrarModal() {
    // Ocultar el modal
    document.getElementById("modalEmpleado").style.display = "none";
}

// Cerrar el modal al hacer clic fuera del contenido
window.onclick = function(event) {
    const modal = document.getElementById("modalEmpleado");
    if (event.target === modal) {
        cerrarModal();
    }
}
