(() => {
  const refs = {
    openModalBtn: document.querySelector("[modal-footer-open]"),
    closeModalBtn: document.querySelector("[modal-footer-close]"),
    modal: document.querySelector("[modal-footer]"),
    backdrop: document.querySelector("[ftr-backdrop]"),
  };

  refs.openModalBtn.addEventListener("click", toggleModal);
  refs.closeModalBtn.addEventListener("click", toggleModal);

  refs.backdrop.addEventListener("click", toggleModal);

  function closeFooterModal(evt) {
    
    if (evt.code === "Escape") {
      toggleModal();
    }
  }
    
  function toggleModal() {
    refs.modal.classList.toggle("visually-hidden");
    refs.backdrop.classList.toggle("visually-hidden");
    let scrollTop = document.scrollingElement.scrollTop;
    refs.modal.style.top = "calc(" + scrollTop + "px + 50%)"; 
    refs.backdrop.style.top = "calc(" + scrollTop + "px)";
        if (refs.backdrop.classList.contains("visually-hidden")) {
      document.removeEventListener("keydown", closeFooterModal)
    } else {
      document.addEventListener("keydown", closeFooterModal);
      refs.backdrop.focus();
    }
    
    document.body.style.overflow = refs.backdrop.classList.contains("visually-hidden") ? "" : "hidden";
  }
})();

    

