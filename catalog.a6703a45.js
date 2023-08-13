function e(e,t,o,s){Object.defineProperty(e,t,{get:o,set:s,enumerable:!0,configurable:!0})}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o={},s={},i=t.parcelRequired9c8;null==i&&((i=function(e){if(e in o)return o[e].exports;if(e in s){var t=s[e];delete s[e];var i={id:e,exports:{}};return o[e]=i,t.call(i.exports,i,i.exports),i.exports}var l=Error("Cannot find module '"+e+"'");throw l.code="MODULE_NOT_FOUND",l}).register=function(e,t){s[e]=t},t.parcelRequired9c8=i),i.register("aER9F",function(e,t){let o=document.querySelector("[scroll-to-top]");document.documentElement,o.addEventListener("click",function(){window.scrollTo({top:0,behavior:"smooth"})}),window.addEventListener("scroll",()=>{window.scrollY>300?(o.classList.add("scroll-to-top"),o.classList.remove("visually-hidden")):(o.classList.remove("scroll-to-top"),o.classList.add("visually-hidden"))})}),i.register("dd1Kv",function(e,t){let o={menuBtn:document.querySelector("[data-menu-open]"),menuContainer:document.querySelector("[data-menu]"),menuBackdrop:document.querySelector("[data-backdrop]"),body:document.querySelector("body")};function s(){o.menuBackdrop.classList.toggle("visually-hidden"),o.menuContainer.classList.toggle("is-open"),o.body.classList.toggle("fixed"),o.body.classList.contains("fixed")&&window.scrollY}o.menuBtn.addEventListener("click",s),o.menuBackdrop.addEventListener("click",function(e){e.target===o.menuBackdrop&&s()}),o.body.classList.toggle("is-open")}),i.register("ge6e3",function(t,o){e(t.exports,"refs",()=>s),e(t.exports,"LIBRARY_KEY",()=>i),e(t.exports,"getGenres",()=>l);let s={API_KEY:"c3755e1c88b3f430b9a9356edda9caa4",BASIC_URL:"https://api.themoviedb.org/3",trending_day:"/trending/movie/day",trending_week:"/trending/movie/week",new_films:"/movie/upcoming",search_films:"/search/movie",movie_detailes:"/movie/",trailer:"/movie/id/videos",genger:"/genre/movie/list"},i="favorite-film";async function l(e){let t=`${s.BASIC_URL}${s.movie_detailes}${e}?api_key=${s.API_KEY}`,o=await fetch(t),i=await o.json(),l=i.genres.slice(0,2).map(({name:e})=>e).join(", ");return l}}),i.register("7dfxV",function(t,o){e(t.exports,"createMarkup",()=>s);function s(e){let t=e.map(({backdrop_path:e,title:t,overview:o,vote_average:s,id:i,name:l})=>`
  <section class="hero-section-slide animate" id="hero-section" style="background: linear-gradient(
  86.77deg,
  var(--total-black) 30.38%,
  rgba(17, 17, 17, 0) 65.61%
),
var(--total-black) url('https://image.tmdb.org/t/p/original${e}') no-repeat center / cover;">
  <div class="hero-img-slide">
    <h1 class="hero-title-slide">${t||l}</h1>
  </div>
  <div class="rating">
    <div class="rating-body">
      <div class="rating-active" style="width:${10*s}%"></div>
    </div>
  </div>
  <p class="hero-descr">${o}</p>
  <div class="hero-btn-wrap" data-id="${i}">
    <button type="button" class="hero-btn hero-btn-trailer" id="hero-btn-trailer" data-id="${i}">
      Watch trailer
    </button>
  <button type="button" class="hero-btn-more open-modal" data-movie-id="${i}">
    More details
  </button>
  </div>
</section>`).join(""),o=document.getElementById("hero-section");o.insertAdjacentHTML("afterend",t),o.remove()}}),i.register("lSnTn",function(e,t){var o=i("ge6e3"),s=i("7dfxV"),l=i("hO2jc");let{BASIC_URL:n,API_KEY:a}=o.refs;async function c(e=1){let t=`${n}/trending/all/day?api_key=${a}&language=en-US&page=${e}`,o=await fetch(t),s=await o.json();return s}async function r(){try{let e=await d(1),t=document.getElementById("hero-section");t&&(t.classList.add("transition-fade"),setTimeout(()=>{(0,s.createMarkup)(e);let t=document.getElementById("hero-section");t.classList.remove("transition-fade")},900))}catch(e){console.error(e)}}async function d(e){try{let t=await c(),o=t.results;return function(e,t){let o=[];for(let s=0;s<t;s+=1){let t=Math.floor(Math.random()*e.length);o.push(e.splice(t,1)[0])}return o}(o,e)}catch(e){}}document.querySelector(".hero-section"),document.querySelector(".button-orange"),document.querySelector(".hero-section-slide"),document.addEventListener("click",l.onWatchTrailer),c(),r(),setInterval(r,1e4)}),i.register("hO2jc",function(t,o){e(t.exports,"onWatchTrailer",()=>g);var s=i("ge6e3");let l={backDropRef:document.querySelector(".trailer-backdrop"),trailerRef:document.querySelector(".trailer-container"),ooopsDropRef:document.querySelector(".ooops-modal-backdrop"),ooopsRef:document.querySelector(".oops-container"),closeOoopsButton:document.querySelector(".close-button-oops")},{BASIC_URL:n,API_KEY:a}=s.refs;async function c(e){let t=`${n}/movie/${e}/videos?api_key=${a}&language=en-US`;try{let e=await fetc(t);if(!e.ok)throw Error(`Request failed with status: ${e.status}`);let o=await e.json();return o.results[0]?.key||null}catch(e){return null}}let r=e=>{e.target.classList.contains("trailer-backdrop")&&u()},d=e=>{"Escape"===e.key&&u()},u=()=>{document.body.classList.remove("is-scroll-block"),l.backDropRef.classList.add("visually-hidden"),l.trailerRef.innerHTML="",document.body.removeEventListener("keydown",d),l.backDropRef.removeEventListener("click",r)};async function m(e){let t=await c(e);t?(document.body.classList.add("is-scroll-block"),l.backDropRef.classList.remove("visually-hidden"),l.trailerRef.innerHTML=`<div><iframe class="trailer-iframe" src='https://www.youtube.com/embed/${t}' frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`,l.backDropRef.addEventListener("click",r),document.body.addEventListener("keydown",d)):(document.body.classList.add("is-scroll-block"),l.ooopsDropRef.classList.remove("visually-hidden"),l.closeOoopsButton.addEventListener("click",v),l.ooopsDropRef.addEventListener("click",p),document.body.addEventListener("keydown",y))}function v(){document.body.classList.remove("is-scroll-block"),l.ooopsDropRef.classList.add("visually-hidden"),l.closeOoopsButton.removeEventListener("click",v),l.trailerRef.innerHTML="",document.body.removeEventListener("keydown",y),l.ooopsDropRef.removeEventListener("click",p)}function p(e){e.target.classList.contains("ooops-modal-backdrop")&&v()}function y(e){"Escape"===e.key&&v()}function g(e){if(e.target.classList.contains("hero-btn-trailer")){let t=e.target.dataset.id;m(t)}}}),i.register("gOgzM",function(e,t){let o=document.querySelector(".switcher"),s="true"===localStorage.getItem("isLight");document.body.classList.toggle("light",s),o.onclick=function(){s=!s,document.body.classList.toggle("light",s),localStorage.setItem("isLight",s)};let i=window.location.pathname,l=document.querySelectorAll(".menu-list, .nav-list");i.includes("index")?(l[0].children[0].classList.add("is-active"),l[1].children[0].classList.add("is-active")):i.includes("catalog")?(l[0].children[0].classList.remove("is-active"),l[1].children[0].classList.remove("is-active"),l[0].children[1].classList.add("is-active"),l[1].children[1].classList.add("is-active")):i.includes("library")&&(l[0].children[0].classList.remove("is-active"),l[1].children[0].classList.remove("is-active"),l[0].children[2].classList.add("is-active"),l[1].children[2].classList.add("is-active"))}),i.register("5hhfL",function(e,t){(()=>{let e={openModalBtn:document.querySelector("[modal-footer-open]"),closeModalBtn:document.querySelector("[modal-footer-close]"),modal:document.querySelector("[modal-footer]"),backdrop:document.querySelector("[ftr-backdrop]"),students:document.querySelector("footer .students")};function t(e){"Escape"===e.code&&o()}function o(){let o=document.scrollingElement.scrollTop;e.modal.style.top="calc("+o+"px + 50%)",e.backdrop.style.top="calc("+o+"px)",e.modal.classList.toggle("visually-hidden"),e.backdrop.classList.toggle("visually-hidden"),e.backdrop.classList.contains("visually-hidden")?document.removeEventListener("keydown",t):(document.addEventListener("keydown",t),e.backdrop.focus(),e.students.scrollTop=0),document.body.style.overflow=e.backdrop.classList.contains("visually-hidden")?"":"hidden"}e.openModalBtn.addEventListener("click",o),e.closeModalBtn.addEventListener("click",o),e.backdrop.addEventListener("click",o)})()}),i.register("itgY7",function(e,t){let o,s;var l=i("ge6e3");let n=document.querySelector(".modal-container"),a=document.querySelector(".overflow");function c(){if(o){let e=o.dataset.movieId,t=JSON.parse(localStorage.getItem(l.LIBRARY_KEY))||[],i=t.find(t=>t.id===Number(e));if(i){let s=t.findIndex(t=>t.id===Number(e));-1!==s&&(t.splice(s,1),localStorage.setItem(l.LIBRARY_KEY,JSON.stringify(t)),o.textContent="Add to my library")}else t.push(s),localStorage.setItem(l.LIBRARY_KEY,JSON.stringify(t)),o.textContent="Remove from my library"}}document.addEventListener("DOMContentLoaded",async()=>{let e=document.querySelector(".modal-container");function t(e){"Escape"===e.code&&(i.close(),document.body.classList.remove("is-scroll-block"),a.classList.remove("visually-hidden"))}let i={onShow:()=>{document.addEventListener("keydown",t),document.body.classList.add("is-scroll-block"),a.classList.remove("visually-hidden")},onClose:()=>{document.removeEventListener("keydown",t),e.classList.add("visually-hidden"),document.body.classList.remove("is-scroll-block")},close:()=>{i.onClose(),document.body.classList.remove("is-scroll-block"),a.classList.remove("visually-hidden")}};e.addEventListener("click",e=>{let t=e.target.closest(".modal__btn-close");t?(i.close(),a.classList.remove("visually-hidden")):e.target.closest(".modal__content")||(i.close(),a.classList.remove("visually-hidden"))}),document.body.addEventListener("click",e=>{e.target.closest(".modal-container")||e.target.closest(".open-modal")||(n.classList.add("visually-hidden"),a.classList.add("visually-hidden"),document.body.classList.remove("is-scroll-block"))}),document.addEventListener("click",async t=>{let n=t.target.closest(".open-modal");if(n){let t=n.dataset.movieId,r=`${l.refs.BASIC_URL}/movie/${t}?api_key=${l.refs.API_KEY}`;try{let n=await fetch(r).then(e=>e.json());if(n){s=n,e.classList.remove("visually-hidden"),a.classList.remove("visually-hidden"),e.innerHTML=function(e){let{id:t,title:o,original_title:s,vote_average:i,vote_count:l,popularity:n,overview:a,genres:c,poster_path:r}=e,d=c.map(({name:e})=>e).join(", "),u="";if(r)u=`https://image.tmdb.org/t/p/original/${r}`;else{let e=window.devicePixelRatio>1?"@2x":"@1x";window.innerWidth<768&&(u=new URL(`./images/oops_opt/oops_mob${e}.png`)),window.innerWidth>=768&&window.innerWidth<1280&&(u=new URL(`./images/oops_opt/oops_tab${e}.png`)),window.innerWidth>=1280&&(u=new URL(`./images/oops_opt/oops_des${e}.png`))}return`
  <button class="modal__btn-close" type="button">
    <svg width="11" height="11" class="modal__icon-moon">
      <use href="./images/icons.svg#icon-cross"></use>
    </svg> 
  </button>
  <div class="mod-con"> 
    <img class="modal__image" src="${u}" alt="${o||s}" />
    <div class="modal__content">
      <h2 class="modal__title">${o||s}</h2>
      <ul class="modal__list">
        <li class="modal__item">
          <div class="modal__desc">Vote / Votes</div>
        </li>
        <li class="modal__item">
          <div class="modal__desc">Popularity</div>
        </li>
        <li class="modal__item">
          <div class="modal__desc">Genre</div>
        </li>
      </ul>
      <ul class="modal__list_second">
         <li class="modal__item__second">
          <div class="modal__value">
            <span class="tag">${i}</span>&nbsp;/&nbsp;<span class="tag tag-last">${l}</span>
          </div>
        </li>
        <li class="modal__item">
          <div class="modal__value">${n}</div>
        </li>
        <li class="modal__item">
          <div class="modal__value">${d}</div>
        </li>
      </ul>
      <div class="modal__about">
        <h3 class="modal__subtitle">About</h3>
        <p class="modal__text">${a}</p>
      </div>
      <button class="btn-add-library" type="button" data-movie-id="${t}">
        Add to my library
      </button>
    </div>
  </div>
  `}(s),(o=document.querySelector(".btn-add-library")).addEventListener("click",c);let r=JSON.parse(localStorage.getItem(l.LIBRARY_KEY))||[];r.some(e=>e.id===Number(t))?o.textContent="Remove from my library":o.textContent="Add to my library",i.onShow()}else console.error("Error fetching movie data:",n.statusText)}catch(e){console.error("Error fetching movie data:",e)}}})})});
//# sourceMappingURL=catalog.a6703a45.js.map
