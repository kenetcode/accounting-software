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
let tlCargos = 0;
let tlAbonos = 0;
let opcionSeleccionada = '';

btnAdd.addEventListener('click', function () {
    form.classList.toggle('active');
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
    const alertText = document.querySelector('#alert-txt');
    if (fecha.value == '' || opcionSeleccionada == '' || (cargo.value == '' && abono.value == '')) {
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
                    <td></td>
                    <td></td>
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
    fecha.value = '';
    cuenta.selectedIndex = 0;
    cargo.value = '';
    abono.value = '';
}




