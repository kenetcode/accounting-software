const fecha = document.querySelector('#fecha');
const btnPrimary = document.querySelector('.btn-primary');
const alert = document.querySelector('#alert');
const alertTxt = document.querySelector('#alert-txt');
const alertBtn = document.querySelector('#alert-btn');

let totalActivos = 0;
let totalPasivos = 0;
let totalCapital = 0;

// Función asincrónica para procesar las transacciones de un año y mes específicos
procesarTransacciones = async (anio, mes) => {
    try {
        // Obtener datos del endpoint de Django
        const response = await fetch(`/balancecomprobacion/${anio}/${mes}`);
        const transacciones = await response.json();
        const response2 = await fetch(`/estadoresultados/${anio}/${mes}`);
        const utilidad = await response2.json();
        transacciones.forEach(element => {
            if(element.codigoCuenta[0] == 1){
                totalActivos += element.saldo;
            }else if(element.codigoCuenta[0] == 2){
                totalPasivos += element.saldo;
            }else if(element.codigoCuenta[0] == 3){
                totalCapital += element.saldo;
            }
        });
        document.getElementById('totalActivos').innerHTML = `$${totalActivos.toFixed(2)}`;
        document.getElementById('totalPasivos').innerHTML = `$${totalPasivos.toFixed(2)}`;
        document.getElementById('patrimonio').innerHTML = `$${(totalCapital + utilidad.utilidad_perdida).toFixed(2)}`;
        // En este caso, el endpoint ya devuelve los datos agrupados y con totales
    } catch (error) {
        console.error("Error al procesar transacciones:", error);
    }
}

// Agrega un evento al elemento de fecha para que al cambiar, procese las transacciones del año y mes seleccionados
btnPrimary.addEventListener('click', async () => {
    if(fecha.value != ''){
        alert.classList.toggle('actived');
        alertTxt.textContent = 'Cierre exitoso';
        const [anio, mes] = fecha.value.split('-');
        await procesarTransacciones(anio, mes);
    }else{
        alert.classList.toggle('actived');
        alertTxt.textContent = 'Por favor, llene la fecha';
    }
});

alertBtn.addEventListener('click', function () {
    alert.classList.toggle('actived');
});
