(() => {
  const mobileMenu = document.querySelector('.js-menu-container');
  const openMenuBtn = document.querySelector('.js-open-menu');
  const navLinks = document.querySelectorAll('.menu-item a');
  const closeModalMenu = document.querySelector('.menu-container')

  const toggleMenu = () => {
    const isMenuOpen =
      openMenuBtn.getAttribute('aria-expanded') === 'true' || false;
    openMenuBtn.setAttribute('aria-expanded', !isMenuOpen);
    mobileMenu.classList.toggle('is-open');

    const scrollLockMethod = !isMenuOpen
      ? 'disableBodyScroll'
      : 'enableBodyScroll';
    bodyScrollLock[scrollLockMethod](document.body);
  };

  openMenuBtn.addEventListener('click', toggleMenu);

  navLinks.forEach(link => link.addEventListener('click', toggleMenu));

  // Close the mobile menu on wider screens if the device orientation changes
  window.matchMedia('(min-width: 768px)').addEventListener('change', e => {
    if (!e.matches) return;
    mobileMenu.classList.remove('is-open');
    openMenuBtn.setAttribute('aria-expanded', false);
    bodyScrollLock.enableBodyScroll(document.body);
  });
})();

closeModalMenu.addEventListener("click", offModalClick)

let modal

function offModalClick(e) {
  e.preventDefault()

  if (e.currentTarget !== mobileMenu) return

  modal = {
    onShow: () => {
      document.addEventListener("keydown", onModal)
    },
    onClose: () => {
      document.removeEventListener("keydown", onModal)
    }
  }

  modal.show()
}


function onModal(e) {
  if (e.code !== "Escape") {
    return
  }

  modal.close()
}


