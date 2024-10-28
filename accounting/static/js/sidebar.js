const btnToggle = document.querySelector('.toggle-button');

btnToggle.addEventListener('click', function() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('activar');
});

const btnHome = document.querySelector('.home-button');
btnHome.addEventListener('click', function() {
    window.location.href = "/";
} );