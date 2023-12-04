let menuBars = document.getElementById('menu-bars');
    let navbar = document.querySelector('.navbar');

    menuBars.addEventListener('click', () => {
        navbar.classList.toggle('active');
    });

    // Tambahkan event listener untuk menutup navbar saat salah satu link diklik
    let navLinks = document.querySelectorAll('.navbar a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
        });
    });






