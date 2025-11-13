const fecha = document.querySelector('#fecha');

// Establecer mes actual por defecto y cargar datos
document.addEventListener('DOMContentLoaded', async function() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    fecha.value = `${year}-${month}`;
    
    // Cargar datos automáticamente
    await procesarTransacciones(year, month);
});

// Función para obtener y procesar transacciones del endpoint de balance de comprobación
async function procesarTransacciones(anio, mes) {
    try {
        // Obtener datos del endpoint de Django
        const response = await fetch(`/libromayorget/${anio}/${mes}`);
        const transacciones = await response.json();

        // Renderizamos los resultados en la tabla
        console.log('Transacciones recibidas:', transacciones);
        
        if (transacciones && transacciones.length > 0) {
            renderResultados(transacciones);
        } else {
            console.log('No hay transacciones para este período');
            // Limpiar tabla y totales
            document.getElementById('tabla-resultados').innerHTML = '<tr><td colspan="7" style="text-align:center;">No hay transacciones para este período</td></tr>';
            document.getElementById('total-cargo').innerHTML = '<strong>$0.00</strong>';
            document.getElementById('total-abono').innerHTML = '<strong>$0.00</strong>';
            document.getElementById('total-saldo').innerHTML = '<strong>$0.00</strong>';
        }
    } catch (error) {
        console.error("Error al procesar transacciones:", error);
    }
}

// Función para renderizar resultados en la tabla HTML
function renderResultados(resultados) {
    const tablaResultados = document.getElementById('tabla-resultados');
    tablaResultados.innerHTML = ""; // Limpiar resultados anteriores
    
    let saldo = 0;
    let totalCargo = 0;
    let totalAbono = 0;
    
    for (let i = 0; i < resultados.length; i++) {
        // Sumar totales - SIMPLE
        totalCargo += parseFloat(resultados[i].Cargo);
        totalAbono += parseFloat(resultados[i].Abono);
        
        const fila = document.createElement('tr');
        const primerDigito = parseInt(resultados[i].codigoCuenta[0]);
        
        // Calcular saldo según tipo de cuenta
        switch (primerDigito) {
            case 1: // Activos
                saldo += resultados[i].Cargo - resultados[i].Abono;
                break;
            case 2: // Pasivos
                saldo += resultados[i].Abono - resultados[i].Cargo;
                break;
            case 3: // Capital
                saldo += resultados[i].Abono - resultados[i].Cargo;
                break;
            case 4: // Gastos
                saldo += resultados[i].Cargo - resultados[i].Abono;
                break;
            case 5: // Ingresos
                saldo += resultados[i].Abono - resultados[i].Cargo;
                break;
        }
        
        // Determinar si debe mostrarse en rojo
        // Pasivos (2), Capital (3), Gastos (4), Ingresos (5) siempre en rojo
        const debeSerRojo = primerDigito === 2 || primerDigito === 3 || primerDigito === 4 || primerDigito === 5;
        const saldoClass = debeSerRojo ? 'negative-value' : '';
        const saldoDisplay = Math.abs(saldo).toFixed(2);
        
        fila.innerHTML = `
            <td>${resultados[i].numeroPartida}</td>
            <td>${resultados[i].fecha}</td>
            <td>${resultados[i].codigoCuenta}</td>
            <td>${resultados[i].nombreCuenta}</td>
            <td>$${resultados[i].Cargo.toFixed(2)}</td>
            <td>$${resultados[i].Abono.toFixed(2)}</td>
            <td class="${saldoClass}">$${saldoDisplay}</td>
        `;
        tablaResultados.appendChild(fila);
        
        if (i < resultados.length-1  && resultados[i+1].codigoCuenta != resultados[i].codigoCuenta) {
            const totalClass = debeSerRojo ? 'negative-value' : '';
            const totalDisplay = Math.abs(saldo).toFixed(2);
            const total = document.createElement('tr');
            total.innerHTML = `
            <td colspan="4" style="text-align:center; font-weight: 600;">TOTAL ${resultados[i].nombreCuenta}</td>
            <td colspan="3" class="${totalClass}" style="text-align:center; font-weight: 600;">$${totalDisplay}</td>
            `;
            tablaResultados.appendChild(total);
            saldo = 0;
        } else if(i == resultados.length-1){
            const totalClass = debeSerRojo ? 'negative-value' : '';
            const totalDisplay = Math.abs(saldo).toFixed(2);
            const total = document.createElement('tr');
            total.innerHTML = `
            <td colspan="4" style="text-align:center; font-weight: 600;">TOTAL ${resultados[i].nombreCuenta}</td>
            <td colspan="3" class="${totalClass}" style="text-align:center; font-weight: 600;">$${totalDisplay}</td>
            `;
            saldo = 0;
            tablaResultados.appendChild(total);
        }
    }
    
    // Actualizar totales - SIMPLE Y DIRECTO
    document.getElementById('total-cargo').textContent = `$${totalCargo.toFixed(2)}`;
    document.getElementById('total-abono').textContent = `$${totalAbono.toFixed(2)}`;
    
    const saldoDiferencia = totalCargo - totalAbono;
    const saldoDisplay = Math.abs(saldoDiferencia).toFixed(2);
    const saldoElement = document.getElementById('total-saldo');
    saldoElement.textContent = `$${saldoDisplay}`;
    if (saldoDiferencia < 0) {
        saldoElement.classList.add('negative-value');
    } else {
        saldoElement.classList.remove('negative-value');
    }
}

fecha.addEventListener('change', async () => {
    const fechaValue = fecha.value.split('-');
    const anio = fechaValue[0];
    const mes = fechaValue[1];
    procesarTransacciones(anio, mes);
});