var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},i={},a=e.parcelRequired9c8;null==a&&((a=function(e){if(e in t)return t[e].exports;if(e in i){var a=i[e];delete i[e];var s={id:e,exports:{}};return t[e]=s,a.call(s.exports,s,s.exports),s.exports}var l=Error("Cannot find module '"+e+"'");throw l.code="MODULE_NOT_FOUND",l}).register=function(e,t){i[e]=t},e.parcelRequired9c8=a),a("aER9F"),a("dd1Kv");var s=a("ge6e3");const l=document.querySelector("#my-library"),d=document.querySelector(".search-movie-btn-link"),n=document.querySelector(".load-more-btn"),r=document.querySelector(".filter-down-button"),o=document.querySelector(".dropdown-list"),c=document.querySelector(".seeall"),v=JSON.parse(localStorage.getItem(s.LIBRARY_KEY))||[];let u=1;async function f(e){let t="";for(let i of e){let{title:e,id:a,poster_path:s,release_date:l,overview:d,vote_average:n}=i,r=await y(a);t+=`<li class="movie-card open-modal" data-movie-id="${a}">
         <div class="gradient"></div>
         <img class="movie-img" src="https://image.tmdb.org/t/p/original/${s}" alt="${d}" loading="lazy" />
         <div class="info">
        <div class="name-and-discr">
         <p class="movie-title">
         ${e}
         </p>
         <p class="movie-description">
         ${r} | ${l.slice(0,4)}
         </p></div>
         <div class="rating-body stars">
      <div class="rating-active" style="width:${10*n}%"></div>
    </div>
  </div>
         </li>`}return l.insertAdjacentHTML("beforeend",t)}async function m(){let e=(u-1)*9,t=e+9,i=v.slice(e,t);if(0===v.length){let e=`<p class="oops-text">OOPS...<br>
     We are very sorry!<br>
     You don’t have any movies at your library.</p>`;l.insertAdjacentHTML("afterBegin",e),d.classList.remove("visually-hidden"),n.classList.add("visually-hidden"),r.classList.add("visually-hidden")}else await f(i),d.classList.add("visually-hidden"),n.classList.remove("visually-hidden"),t>=v.length?(n.classList.add("visually-hidden"),d.classList.remove("visually-hidden")):n.classList.remove("visually-hidden")}c.addEventListener("click",e=>{e.preventDefault(),l.innerHTML="",r.textContent="Genre",u=1,m()}),n.addEventListener("click",function(){u+=1,m()}),o.addEventListener("click",function(e){if("A"!==e.target.tagName)return;let t=e.target.textContent;r.textContent=t,o.classList.add("visually-hidden")}),document.addEventListener("click",function(e){e.target!==o&&e.target!==r&&o.classList.add("visually-hidden")}),r.addEventListener("click",function(e){o.classList.remove("visually-hidden"),o.classList.add("active")}),m(),async function(){let e=JSON.parse(localStorage.getItem(s.LIBRARY_KEY))||[],t=[];for(let i of e){let e=await y(i.id);e.forEach(e=>{if(!t.includes(e)){t.push(e);let i=`<li data-name="${e}">
          <a class="genre-item" href="#" data-name="${e}">${e}</a>
        </li>`;o.insertAdjacentHTML("beforeend",i)}})}}();const g=document.querySelector(".dropdown-list");async function p(e){e.preventDefault();let t=JSON.parse(localStorage.getItem(s.LIBRARY_KEY))||[],i=e.target.dataset.name;l.innerHTML="";let a=!1;for(let e of t){let t=await y(e.id);if(t.includes(i)){a=!0;let i=`<li class="movie-card open-modal" data-movie-id="${e.id}">
         <div class="gradient"></div>
         <img class="movie-img" src="https://image.tmdb.org/t/p/original/${e.poster_path}" alt="${e.overview}" loading="lazy" />
         <div class="info">
          <div class="name-and-discr">
           <p class="movie-title">${e.title}</p>
           <p class="movie-description">${t} | ${e.release_date.slice(0,4)}</p>
          </div>
          <div class="rating-body stars">
            <div class="rating-active" style="width:${10*e.vote_average}%"></div>
          </div>
        </div>
       </li>`;l.insertAdjacentHTML("beforeend",i)}}if(!a){let e=`<p class="oops-text">OOPS...<br>
     We are very sorry!<br>
     We didn't find movies with this genre.</p>`;l.innerHTML=e,d.classList.remove("visually-hidden"),n.classList.add("visually-hidden")}}async function y(e){let t=`${s.refs.BASIC_URL}${s.refs.movie_detailes}${e}?api_key=${s.refs.API_KEY}`,i=await fetch(t),a=await i.json(),l=a.genres.slice(0,2).map(({name:e})=>e);return l}g.addEventListener("click",p),a("7dfxV"),a("lSnTn"),a("gOgzM"),a("5hhfL"),a("itgY7");
//# sourceMappingURL=my-library.7ad59fea.js.map
