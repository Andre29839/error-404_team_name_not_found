const refs = {
  menuBtn: document.querySelector('[data-menu-open]'),
  menuContainer: document.querySelector('[data-menu]'),
  menuBackdrop: document.querySelector('[data-backdrop]'),
  body: document.querySelector('body'),
};

refs.menuBtn.addEventListener('click', toggleModal);

refs.menuBackdrop.addEventListener('click', closeOnBackdropClick);

let scrollPosition

function closeOnBackdropClick(e) {
  if (e.target === refs.menuBackdrop) {
    toggleModal();
  }
}

function toggleModal() {
  refs.menuBackdrop.classList.toggle('visually-hidden');
  refs.menuContainer.classList.toggle('is-open');
  refs.body.classList.toggle('fixed');
  if (refs.body.classList.contains('fixed')) {
    scrollPosition = window.scrollY;
  }
}
  refs.body.classList.toggle('is-open');

