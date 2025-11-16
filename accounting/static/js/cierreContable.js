const fecha = document.querySelector('#fecha');
const btnPrimary = document.querySelector('.btn-primary');
const btnReiniciar = document.querySelector('.btn-reiniciar');
const alert = document.querySelector('#alert');
const alertTxt = document.querySelector('#alert-txt');
const alertBtn = document.querySelector('#alert-btn');

let cierreRealizado = false;

// Establecer mes actual por defecto y cargar datos
document.addEventListener('DOMContentLoaded', async function() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    fecha.value = `${year}-${month}`;
    
    // Cargar datos automáticamente
    await calcularTotales(year, month);
});

// Función asincrónica para calcular los totales
async function calcularTotales(anio, mes) {
    try {
        // RESETEAR totales antes de calcular
        let totalActivos = 0;
        let totalPasivos = 0;
        let totalCapital = 0;
        
        // Obtener datos del endpoint de Django
        const response = await fetch(`/balancecomprobacion/${anio}/${mes}`);
        const transacciones = await response.json();
        const response2 = await fetch(`/estadoresultados/${anio}/${mes}`);
        const utilidad = await response2.json();
        
        transacciones.forEach(element => {
            if(element.codigoCuenta[0] == 1){
                totalActivos += Math.abs(element.saldo);
            }else if(element.codigoCuenta[0] == 2){
                totalPasivos += Math.abs(element.saldo);
            }else if(element.codigoCuenta[0] == 3){
                totalCapital += Math.abs(element.saldo);
            }
        });
        
        document.getElementById('totalActivos').innerHTML = `$${totalActivos.toFixed(2)}`;
        document.getElementById('totalPasivos').innerHTML = `$${totalPasivos.toFixed(2)}`;
        document.getElementById('patrimonio').innerHTML = `$${(totalCapital + utilidad.utilidad_perdida).toFixed(2)}`;
    } catch (error) {
        console.error("Error al procesar transacciones:", error);
    }
}

// Evento para cambiar de mes
fecha.addEventListener('change', async () => {
    const [anio, mes] = fecha.value.split('-');
    await calcularTotales(anio, mes);
    // Habilitar botón de cierre al cambiar mes
    btnPrimary.disabled = false;
    btnPrimary.textContent = 'Iniciar Cierre';
    cierreRealizado = false;
});

// Evento del botón de cierre
btnPrimary.addEventListener('click', async () => {
    if(fecha.value == ''){
        alert.classList.toggle('actived');
        alertTxt.textContent = 'Por favor, seleccione la fecha';
        return;
    }
    
    if(cierreRealizado){
        alert.classList.toggle('actived');
        alertTxt.textContent = 'Ya se realizó el cierre para este período. Cambie el mes o haga clic en Reiniciar.';
        return;
    }
    
    // Realizar cierre
    alert.classList.toggle('actived');
    alertTxt.textContent = 'Cierre contable realizado exitosamente';
    
    // Deshabilitar botón y cambiar texto
    btnPrimary.disabled = true;
    btnPrimary.textContent = 'Cierre Realizado ✓';
    cierreRealizado = true;
});

// Evento del botón reiniciar
btnReiniciar.addEventListener('click', async () => {
    // Recalcular totales
    const [anio, mes] = fecha.value.split('-');
    await calcularTotales(anio, mes);
    
    // Habilitar botón de cierre
    btnPrimary.disabled = false;
    btnPrimary.textContent = 'Iniciar Cierre';
    cierreRealizado = false;
    
    alert.classList.toggle('actived');
    alertTxt.textContent = 'Valores reiniciados correctamente';
});

alertBtn.addEventListener('click', function () {
    alert.classList.toggle('actived');
});
