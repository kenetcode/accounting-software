document.addEventListener('DOMContentLoaded', function() {
    const fechaInput = document.getElementById('fecha');

    fechaInput.addEventListener('change', fetchEstadoCapital);

    async function fetchEstadoCapital() {
        const fecha = fechaInput.value;
        if (!fecha) return;

        const [year, month] = fecha.split('-');
        const response = await fetch(`/estadodecapitaldata/${year}/${month}/`);
        const data = await response.json();

        console.log("Datos recibidos:", data);

        document.getElementById('total-cargo').textContent = `$${data.total_cargo.toFixed(2)}`;
        document.getElementById('total-abono').textContent = `$${data.total_abono.toFixed(2)}`;
        document.getElementById('capital').textContent = `$${(data.total_abono - data.total_cargo).toFixed(2)}`;

        const tbody = document.getElementById('estado-capital-body');
        tbody.innerHTML = `
            <tr>
                <td>${data.codigo}</td>
                <td>${data.nombre}</td>
                <td>$${data.total_cargo.toFixed(2)}</td>
                <td>$${data.total_abono.toFixed(2)}</td>
            </tr>
        `;
    }
});
