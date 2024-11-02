const btnToggle = document.querySelector('.toggle-button');
const btnHome = document.querySelector('.home-button');
const btnCatalogo = document.querySelector('.catalogo-button');
const btnTransacciones = document.querySelector('.transacciones-button');
/* nuevos */
const btnControlCostos = document.querySelector('.costos-button');
const btnEstadosFinancieros = document.querySelector('.estados-button');
const btnLibroMayor = document.querySelector('.libro-button');
const btnCierreContable = document.querySelector('.cierre-button');

let toggle = 0;

btnToggle.addEventListener('click', function () {
    const sidebar = document.getElementById('sidebar');
    const span = btnToggle.getElementsByTagName('span')
    if (toggle == 0) {
        span[0].classList.remove('activate');
        span[0].classList.add('deactivate');
        span[1].classList.remove('deactivate');
        span[1].classList.add('activate');
        toggle = 1;
    }
    else {
        span[0].classList.remove('deactivate');
        span[0].classList.add('activate');
        span[1].classList.remove('activate');
        span[1].classList.add('deactivate');
        toggle = 0;
    }

    sidebar.classList.toggle('activar');
});


btnHome.addEventListener('click', function () {
    window.location.href = "/";
});

//MODIFICAR (YA ESTA)
btnTransacciones.addEventListener('click', function () {
    window.location.href = "/transacciones/";
});

btnCatalogo.addEventListener('click', function () {
    window.location.href = "/catalogo/";
});

/* NUEVOS */

btnControlCostos.addEventListener('click', function () {
    window.location.href = "/controldecostos/";
});

btnEstadosFinancieros.addEventListener('click', function () {
    window.location.href = "/estadosfinancieros/";
});

btnLibroMayor.addEventListener('click', function () {
    window.location.href = "/libromayor/";
});

btnCierreContable.addEventListener('click', function () {
    window.location.href = "/cierrecontable/";
});



