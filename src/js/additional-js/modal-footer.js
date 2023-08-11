(() => {
  const refs = {
    openModalBtn: document.querySelector("[modal-footer-open]"),
    closeModalBtn: document.querySelector("[modal-footer-close]"),
    modal: document.querySelector("[modal-footer]"),
    backdrop: document.querySelector("[ftr-backdrop]"),
  };

  refs.openModalBtn.addEventListener("click", toggleModal);
  refs.closeModalBtn.addEventListener("click", toggleModal);

  function toggleModal() {
    refs.modal.classList.toggle("visually-hidden");
    refs.backdrop.classList.toggle("visually-hidden");
    let scrollTop = document.scrollingElement.scrollTop;
    refs.modal.style.top = "calc(" + scrollTop + "px + 50%)"; 
    refs.backdrop.style.top = "calc(" + scrollTop + "px)";
    document.body.style.overflow = refs.backdrop.classList.contains("visually-hidden") ? "" : "hidden";
  }
})();