const scrollToTopView = document.querySelector('[scroll-to-top]');
const rootElement = document.documentElement;

scrollToTopView.addEventListener("click", scrollToTop);


function scrollOnTop(){
    const showBtn = window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopView.classList.add('scroll-to-top');
            scrollToTopView.classList.remove('visually-hidden')
        } else {
          scrollToTopView.classList.remove('scroll-to-top');
          scrollToTopView.classList.add('visually-hidden')
        }
    });
    }
    scrollOnTop()

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}