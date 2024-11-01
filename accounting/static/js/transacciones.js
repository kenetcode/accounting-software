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

btnCuenta.addEventListener('click', function () {
    opcionSeleccionada = cuenta.options[cuenta.selectedIndex].value;
    console.log(opcionSeleccionada);
    console.log(fecha.value);
    console.log(cargo.value);
    console.log(abono.value);
    if (fecha.value == '' || cargo.value == '' || abono.value == '') {
        alert.classList.toggle('actived');
    }
    else {
        form.classList.toggle('active');
        getCuenta();
    }
    
});

btnAlert.addEventListener('click', function () {
    alert.classList.toggle('actived');
});

btnRegresar.addEventListener('click', function () {
    form.classList.toggle('active');
});

const getCuenta = async () => {
    const endpoint = `/cuentas/${opcionSeleccionada}`
    try {
        const response = await fetch(endpoint);
        const data = await response.json();
        table.innerHTML += `
        <tr>
                    <td>${fecha.value}</td>
                    <td>${data.codigo}</td>
                    <td>${data.cuenta}</td>
                    <td>${cargo.value}</td>
                    <td>${abono.value}</td>
        </tr>
                `;
        tlCargos += isNaN(parseFloat(cargo.value)) ? 0 : parseFloat(cargo.value);
        tlAbonos += isNaN(parseFloat(abono.value)) ? 0 : parseFloat(abono.value);
        totalCargo.textContent = `$${tlCargos}`;
        totalAbono.textContent = `$${tlAbonos}`;
    } catch (error) {
        console.log(error);
    }
}




