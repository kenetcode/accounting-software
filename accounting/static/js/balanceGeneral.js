// Selecciona el elemento de fecha del DOM
const fecha = document.querySelector('#fecha');

// Función asincrónica para obtener la utilidad o pérdida de un año y mes específicos
async function obtenerUtilidad(anio, mes) {
    try {
        // Obtener datos del endpoint de Django
        const response = await fetch(`/estadoresultados/${anio}/${mes}`);
        const transacciones = await response.json();
        console.log(transacciones);
        console.log(transacciones.utilidad_perdida);
        // En este caso, el endpoint ya devuelve los datos agrupados y con totales
    } catch (error) {
        console.error("Error al procesar transacciones:", error);
    }
}

// Función asincrónica para procesar las transacciones de un año y mes específicos
procesarTransacciones = async (anio, mes) => {
    try {
        // Obtener datos del endpoint de Django
        const response = await fetch(`/balancecomprobacion/${anio}/${mes}`);
        const transacciones = await response.json();
        console.log(transacciones);
        // En este caso, el endpoint ya devuelve los datos agrupados y con totales
    } catch (error) {
        console.error("Error al procesar transacciones:", error);
    }
}

// Agrega un evento al elemento de fecha para que al cambiar, procese las transacciones del año y mes seleccionados
fecha.addEventListener('change', async () => {
    const [anio, mes] = fecha.value.split('-');
    console.log(anio, mes); 
    await procesarTransacciones(anio, mes);
    await obtenerUtilidad(anio, mes);
});

function imprimirTabla(){
    window.print();
}