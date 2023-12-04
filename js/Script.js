let menu = document.querySelector('#menu-bars');
let navbar = document.querySelector('.navbar');
let navLinks = document.querySelectorAll('.navbar a');

menu.addEventListener('click', () => {
  menu.classList.toggle('fa-times');
  navbar.classList.toggle('active');
});

// Close the menu when a link is clicked
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
  });
});

window.addEventListener('scroll', () => {
  menu.classList.remove('fa-times');
  navbar.classList.remove('active');
});







