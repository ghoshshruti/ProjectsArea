// script.js
// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
  
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
  
  // Responsive navbar
  const navbarToggle = document.querySelector('.navbar-toggle');
  const navbarRight = document.querySelector('.navbar-right');
  
  navbarToggle.addEventListener('click', () => {
    navbarRight.classList.toggle('active');
  });
  
  // Form submission (you'll need to add backend code for this)
  const form = document.querySelector('form');
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Add code to handle form submission (e.g., send data to backend)
  });