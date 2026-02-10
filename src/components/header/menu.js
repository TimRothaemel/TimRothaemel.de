const menubtn = document.getElementById('menu-btn');
const navLinks  = document.getElementById('nav-links');

menubtn.addEventListener('click', () => {
  const isOpen = menu-btn.classList.toggle('open');
  navLinks.classList.toggle('open');
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    menubtn.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

function setActiveLink() {
  const currentPath = window.location.pathname;

  document.querySelectorAll('.nav-link').forEach(link => {
    const linkPath = new URL(link.href).pathname;

    if (linkPath === currentPath) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

setActiveLink();

window.addEventListener('popstate', setActiveLink);