(() => {
  const refs = {
    openModalBtn: document.querySelector("[modal-footer-open]"),
    closeModalBtn: document.querySelector("[modal-footer-close]"),
    modal: document.querySelector("[modal-footer]"),
    backdrop: document.querySelector("[ftr-backdrop]"),
    students: document.querySelector("footer .students"),
  };

  refs.openModalBtn.addEventListener("click", openModal);
  refs.closeModalBtn.addEventListener("click", closeModal);
  refs.backdrop.addEventListener("click", closeModal);

  function closeFooterModal(evt) {
    if (evt.code === "Escape") {
      closeModal();
    }
  }

  function openModal() {
    refs.modal.classList.remove("visually-hidden");
    refs.backdrop.classList.remove("visually-hidden");
    
    document.addEventListener("keydown", closeFooterModal);
    refs.backdrop.focus();
    refs.students.scrollTop = 0;    
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    refs.modal.classList.add("visually-hidden");
    refs.backdrop.classList.add("visually-hidden");

    document.removeEventListener("keydown", closeFooterModal);
    document.body.style.overflow = "";
  }
})();