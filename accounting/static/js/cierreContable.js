// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Sidebar Toggle
    const toggleButton = document.querySelector('.toggle-button');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.main-content');

    toggleButton.addEventListener('click', function() {
        sidebar.classList.toggle('active');
        mainContent.classList.toggle('sidebar-active');
    });
});

function iniciarCierre() {
    const periodo = document.getElementById('periodo').value;
    const fecha = document.getElementById('fecha').value;

    if (!periodo || !fecha) {
        alert('Por favor complete todos los campos');
        return;
    }

    // Aquí iría la lógica para iniciar el cierre
    alert('Iniciando proceso de cierre contable...');
}

function verificarBalance() {
    // Simulación de cálculos de balance
    const activos = Math.random() * 1000000;
    const pasivos = Math.random() * 600000;
    const patrimonio = activos - pasivos;

    document.getElementById('totalActivos').textContent = formatMoney(activos);
    document.getElementById('totalPasivos').textContent = formatMoney(pasivos);
    document.getElementById('patrimonio').textContent = formatMoney(patrimonio);
}

function cancelar() {
    if (confirm('¿Está seguro que desea cancelar el proceso?')) {
        document.getElementById('periodo').value = '';
        document.getElementById('fecha').value = '';
        document.getElementById('totalActivos').textContent = '$0.00';
        document.getElementById('totalPasivos').textContent = '$0.00';
        document.getElementById('patrimonio').textContent = '$0.00';
    }
}

function formatMoney(amount) {
    return '$' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}