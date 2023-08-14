(() => {
  const refs = {
    openModalBtn: document.querySelector("[modal-footer-open]"),
    closeModalBtn: document.querySelector("[modal-footer-close]"),
    modal: document.querySelector("[modal-footer]"),
    backdrop: document.querySelector("[ftr-backdrop]"),
    students: document.querySelector("footer .students"),
  };

  refs.openModalBtn.addEventListener("click", toggleModal);
  refs.closeModalBtn.addEventListener("click", closeBtnFtrModal);

  refs.backdrop.addEventListener("click", closeBtnFtrModal);

  function closeFooterModal(evt) {
    
    if (evt.code === "Escape") {
      closeBtnFtrModal();
    }
  }
  
  function closeBtnFtrModal() {
    toggleModal(false, false);
  }
  function toggleModal(evt, show) {
    if (evt) { 
     /*  evt.preventDefault(); */
    }
    
    let scrollTop = document.scrollingElement.scrollTop;
    
    /* refs.modal.style.top = "calc(" + scrollTop + "px + 20px)"; */
    refs.backdrop.style.top = "calc(" + scrollTop + "px)";
    if (show === false) {
      refs.modal.classList.add("visually-hidden");
      refs.backdrop.classList.add("visually-hidden");
    } else {
      refs.modal.classList.toggle("visually-hidden");
      refs.backdrop.classList.toggle("visually-hidden");
    }
    
    
        if (refs.backdrop.classList.contains("visually-hidden")) {
      document.removeEventListener("keydown", closeFooterModal)
    } else {
      document.addEventListener("keydown", closeFooterModal);
      refs.backdrop.focus();
      refs.students.scrollTop = 0;    
    }
    
    document.body.style.overflow = refs.backdrop.classList.contains("visually-hidden") ? "" : "hidden";
  }
})();
