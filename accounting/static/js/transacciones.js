const form = document.querySelector('#form');
const btnAdd = document.querySelector('.add-btn');
const btnCuenta = document.querySelector('.cuenta-btn');
const btnRegresar = document.querySelector('.regresar-btn');
const cuenta = document.getElementById('cuentas');
const table = document.querySelector('#tbody');
const fecha = document.getElementById('fecha');
const cargo = document.getElementById('cargo');
const abono = document.getElementById('abono');
const totalCargo = document.getElementById('total-cargo');
const totalAbono = document.getElementById('total-abono');
const alert = document.querySelector('#alert');
const btnAlert = document.querySelector('#alert-btn');
const alertText = document.querySelector('#alert-txt');
const numeroPartida = document.querySelector('.numero-partida');
let tlCargos = 0;
let tlAbonos = 0;
let opcionSeleccionada = '';

fecha.addEventListener('change', async function () {
    numeroPartida.textContent = `Partida No. ${await getNumeroTransaccion()}`;
});

btnAdd.addEventListener('click', function () {
    if(fecha.value == ''){
        alert.classList.toggle('actived');
        alertText.textContent = 'Por favor, llene la fecha';
    }else{
        form.classList.toggle('active');
    }
});

btnAlert.addEventListener('click', function () {
    alert.classList.toggle('actived');
});

btnRegresar.addEventListener('click', function () {
    form.classList.toggle('active');
    limpiarCampos();
});

const getCuenta = async () => {
    const endpoint = `/cuentas/${opcionSeleccionada}`
    try {
        const response = await fetch(endpoint);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

btnCuenta.addEventListener('click', async function () {
    opcionSeleccionada = cuenta.options[cuenta.selectedIndex].value;
    const rows = table.getElementsByTagName('tr');
    if (opcionSeleccionada == '' || (cargo.value == '' && abono.value == '')) {
        alert.classList.toggle('actived');
        alertText.textContent = 'Por favor, llene todos los campos';
    } else if (cargo.value !== '' && abono.value !== '') {
        alert.classList.toggle('actived');
        alertText.textContent = 'No puede tener cargo y abono a la vez';
    } else if (rows.length > 0) {
        const data = await getCuenta();
        if(validarEnTabla(data) === false){
            form.classList.toggle('active');
            insertarEnTabla(data);
            limpiarCampos();
        }else{
            alert.classList.toggle('actived');
            alertText.textContent = 'Esta cuenta ya esta en la transaccion';
        }
    } else {
        const data = await getCuenta();
        form.classList.toggle('active');
        fecha.disabled = 'true';
        insertarEnTabla(data);
        limpiarCampos();
    }
});

function validarEnTabla(data){
    let existe = false;
    const rows = table.getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {
        const firstCol = rows[i].getElementsByTagName('td')[1];
        const text = firstCol.textContent;
        let validar = data.cuenta_detalle.codigo !== '' && data.cuenta_detalle.cuenta !== '';
        if (validar) {
            if (text.indexOf(data.cuenta_detalle.codigo) >= 0 && text.length > 4) {
                existe = true;
            }
        } else {
            if (text.indexOf(data.codigo) >= 0) {
                existe = true;
            }
        }
    }
    return existe;
}

function insertarEnTabla(data) {
    if (data.cuenta_detalle.codigo !== '' && data.cuenta_detalle.cuenta !== '') {
        table.innerHTML += `
                <tr>
                    <td>${fecha.value}</td>
                    <td>${data.codigo}</td>
                    <td>${data.cuenta}</td>
                    <td>${cargo.value}</td>
                    <td>${abono.value}</td>
                </tr>
                <tr>
                    <td>${fecha.value}</td>
                    <td>${data.cuenta_detalle.codigo}</td>
                    <td>${data.cuenta_detalle.cuenta}</td>
                    <td>${cargo.value}</td>
                    <td>${abono.value}</td>
                </tr>
            `;
    }else{
        table.innerHTML += `
        <tr>
                    <td>${fecha.value}</td>
                    <td>${data.codigo}</td>
                    <td>${data.cuenta}</td>
                    <td>${cargo.value}</td>
                    <td>${abono.value}</td>
        </tr>
                `;
    }
    tlCargos += isNaN(parseFloat(cargo.value)) ? 0 : parseFloat(cargo.value);
    tlAbonos += isNaN(parseFloat(abono.value)) ? 0 : parseFloat(abono.value);
    totalCargo.textContent = `$${tlCargos}`;
    totalAbono.textContent = `$${tlAbonos}`;
}

limpiarCampos = () => {
    cuenta.selectedIndex = 0;
    cargo.value = '';
    abono.value = '';
}

guardarTransacción = async () =>{
    const rows = table.getElementsByTagName('tr');
    if(tlCargos !== tlAbonos){
        alert.classList.toggle('actived');
        alertText.textContent = 'Los cargos y abonos no coinciden';
        console.log(`error`);
    }else if(tlAbonos === 0 && tlCargos === 0){
        alert.classList.toggle('actived');
        alertText.textContent = `No se ha introducido ninguna cuenta`;
    }else if(fecha.value == ''){
        alert.classList.toggle('actived');
        alertText.textContent = 'Por favor, llene la fecha';
    } else{
        let numeroPartida = await getNumeroTransaccion();
        console.log(numeroPartida);
        for (let i = 0; i < rows.length; i++) {
            const cols = rows[i].getElementsByTagName('td');
            if(cols[1].textContent.length < 5){
                const obj = {
                    numero_partida: numeroPartida,
                    fecha: cols[0].textContent,
                    codigo: cols[1].textContent,
                    cuenta: cols[2].textContent,
                    cargo: parseFloat((cols[3].textContent == '') ? 0 : cols[3].textContent),
                    abono: parseFloat((cols[4].textContent == '')? 0 : cols[4].textContent)
                }
                registrarTransaccion(obj);
            }
        }
        // Nuevo bucle para registrar en otra tabla
        for (let i = 0; i < rows.length; i++) {
            const cols = rows[i].getElementsByTagName('td');
            const obj = {
                numero_partida: numeroPartida,
                fecha: cols[0].textContent,
                codigo: cols[1].textContent,
                cuenta: cols[2].textContent,
                cargo: parseFloat((cols[3].textContent == '') ? 0 : cols[3].textContent),
                abono: parseFloat((cols[4].textContent == '')? 0 : cols[4].textContent)
            }
            registrarTransaccionesCompletas(obj);
        }
        limpiarTodo();
    }
    console.log(data);
}

registrarTransaccionesCompletas = async (data) => {
    const endpoint = `/registrarOtraTabla/`; // Asegúrate de que este endpoint coincida con la ruta en urls.py
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: JSON.stringify(data)
        });
        const res = await response.json();
        console.log(res);
    } catch (error) {
        console.log(error);
    }
}

getNumeroTransaccion = async () => {
    const fechaObj = new Date(fecha.value);
    console.log(fechaObj);
    const endpoint = `/transacciones/${fechaObj.getFullYear()}/${fechaObj.getMonth()+1}`;
    try {
        const response = await fetch(endpoint);
        const data = await response.json();
        return data.numero;
    } catch (error) {
        console.log(error);
    }
}

registrarTransaccion = async (data) => {
    const endpoint = `/registrartransacciones/`;
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: JSON.stringify(data)
        });
        const res = await response.json();
        console.log(res);
    } catch (error) {
        console.log(error);
    }
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}



limpiarTodo = () => {
    tlCargos = 0;
    tlAbonos = 0;
    totalCargo.textContent = `$${tlCargos}`;
    totalAbono.textContent = `$${tlAbonos}`;
    table.innerHTML = '';
    fecha.value = '';
    fecha.disabled = false;
    numeroPartida.textContent = '';
}