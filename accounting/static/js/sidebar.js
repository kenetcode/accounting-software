const btnToggle = document.querySelector('.toggle-button');
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

const btnHome = document.querySelector('.home-button');
btnHome.addEventListener('click', function () {
    window.location.href = "/";
});

