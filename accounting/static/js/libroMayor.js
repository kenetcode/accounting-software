const fecha = document.querySelector('#fecha');

// Función para obtener y procesar transacciones del endpoint de balance de comprobación
async function procesarTransacciones(anio, mes) {
    try {
        // Obtener datos del endpoint de Django
        const response = await fetch(`/libromayorget/${anio}/${mes}`);
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
    let saldo = 0;
    for (i = 0; i < resultados.length; i++) {
        const fila = document.createElement('tr');
        switch (parseInt(resultados[i].codigoCuenta[0])) {
            case 1:
                saldo += resultados[i].Cargo - resultados[i].Abono;
                break;
            case 2:
                saldo +=  resultados[i].Abono - resultados[i].Cargo;
                break;
            case 3:
                saldo +=  resultados[i].Abono - resultados[i].Cargo;
                break;
            case 4:
                saldo +=  resultados[i].Cargo - resultados[i].Abono;
                break;
            case 5:
                saldo +=  resultados[i].Abono - resultados[i].Cargo;
                break;
        }
        fila.innerHTML = `
            <td>${resultados[i].numeroPartida}</td>
            <td>${resultados[i].fecha}</td>
            <td>${resultados[i].codigoCuenta}</td>
            <td>${resultados[i].nombreCuenta}</td>
            <td>$${resultados[i].Cargo.toFixed(2)}</td>
            <td>$${resultados[i].Abono.toFixed(2)}</td>
            <td>$${saldo.toFixed(2)}</td>
        `;
        tablaResultados.appendChild(fila);
        if (i < resultados.length-1  && resultados[i+1].codigoCuenta != resultados[i].codigoCuenta) {
            const total = document.createElement('tr');
            total.innerHTML = `
            <td colspan="4" style="text-align:center">TOTAL ${resultados[i].nombreCuenta}</td>
            <td colspan="3" style="text-align:center">$${saldo.toFixed(2)}</td>
            `;
            tablaResultados.appendChild(total);
            saldo = 0;
        } else if(i == resultados.length-1){
            const total = document.createElement('tr');
            total.innerHTML = `
            <td colspan="4" style="text-align:center">TOTAL ${resultados[i].nombreCuenta}</td>
            <td colspan="3" style="text-align:center">$${saldo.toFixed(2)}</td>
            `;
            saldo = 0;
            tablaResultados.appendChild(total);
        }

    }
    /* resultados.forEach(resultado => {
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
    }); */
}

// Ejecutar procesarTransacciones cuando el DOM esté completamente cargado
/* document.addEventListener("DOMContentLoaded", async () => {
    procesarTransacciones(); // Llama a la función principal cuando el DOM esté listo
}); */

fecha.addEventListener('change', async () => {
    const fechaValue = fecha.value.split('-');
    const anio = fechaValue[0];
    const mes = fechaValue[1];
    procesarTransacciones(anio, mes);
});