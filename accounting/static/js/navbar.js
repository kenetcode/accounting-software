// Navbar toggle para móviles
document.addEventListener('DOMContentLoaded', function() {
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarMenu = document.querySelector('.navbar-menu');
    
    if (navbarToggle && navbarMenu) {
        navbarToggle.addEventListener('click', function() {
            navbarMenu.classList.toggle('active');
            
            // Cambiar icono del botón
            const icon = this.querySelector('span');
            if (icon) {
                if (navbarMenu.classList.contains('active')) {
                    icon.textContent = '✕';
                } else {
                    icon.textContent = '☰';
                }
            }
        });
        
        // Cerrar el menú cuando se hace clic en un enlace (en móviles)
        const navbarLinks = document.querySelectorAll('.navbar-link');
        navbarLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navbarMenu.classList.remove('active');
                    const icon = navbarToggle.querySelector('span');
                    if (icon) {
                        icon.textContent = '☰';
                    }
                }
            });
        });
        
        // Cerrar el menú si se hace clic fuera de él
        document.addEventListener('click', function(event) {
            const isClickInside = navbarMenu.contains(event.target) || navbarToggle.contains(event.target);
            if (!isClickInside && navbarMenu.classList.contains('active')) {
                navbarMenu.classList.remove('active');
                const icon = navbarToggle.querySelector('span');
                if (icon) {
                    icon.textContent = '☰';
                }
            }
        });
    }
});

