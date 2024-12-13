const menuButtons = document.querySelectorAll('.button-menu');
const menuToggle = document.getElementById('menu-toggle');

menuButtons.forEach((button) => {
  button.addEventListener('click', () => {
    menuToggle.checked = false;
  });
});
