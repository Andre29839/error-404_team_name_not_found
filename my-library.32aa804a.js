var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},i={},t={},a=e.parcelRequired9c8;null==a&&((a=function(e){if(e in i)return i[e].exports;if(e in t){var a=t[e];delete t[e];var s={id:e,exports:{}};return i[e]=s,a.call(s.exports,s,s.exports),s.exports}var l=Error("Cannot find module '"+e+"'");throw l.code="MODULE_NOT_FOUND",l}).register=function(e,i){t[e]=i},e.parcelRequired9c8=a),a("aER9F"),a("dd1Kv");var s=a("ge6e3");const l=document.querySelector("#my-library"),d=document.querySelector(".search-movie-btn-link"),n=document.querySelector(".load-more-btn"),r=document.querySelector(".filter-down-button"),o=document.querySelector(".dropdown-list"),c=JSON.parse(localStorage.getItem(s.LIBRARY_KEY))||[];let v=1;async function u(e){let i="";for(let t of e){let{title:e,id:a,poster_path:s,release_date:l,overview:d,vote_average:n}=t,r=await p(a);i+=`<li class="movie-card open-modal" data-movie-id="${a}">
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
         </li>`}return l.insertAdjacentHTML("beforeend",i)}async function g(){let e=(v-1)*9,i=e+9,t=c.slice(e,i);if(0===c.length){let e=`<p class="oops-text">OOPS...<br>
     We are very sorry!<br>
     You don’t have any movies at your library.</p>`;l.insertAdjacentHTML("afterBegin",e),d.classList.remove("visually-hidden"),n.classList.add("visually-hidden"),r.classList.add("visually-hidden")}else await u(t),d.classList.add("visually-hidden"),n.classList.remove("visually-hidden"),i>=c.length?(n.classList.add("visually-hidden"),d.classList.remove("visually-hidden")):n.classList.remove("visually-hidden")}n.addEventListener("click",function(){v+=1,g()}),o.addEventListener("click",function(e){if("A"!==e.target.tagName)return;let i=e.target.textContent;r.textContent=i}),r.addEventListener("click",function(){o.classList.toggle("visually-hidden"),o.classList.toggle("active")}),g();const m=document.querySelector(".dropdown-list");async function f(e){e.preventDefault();let i=JSON.parse(localStorage.getItem(s.LIBRARY_KEY))||[],t=e.target.dataset.name;l.innerHTML="";let a=!1;for(let e of i){let i=await p(e.id);if(i.includes(t)){a=!0;let t=`<li class="movie-card open-modal" data-movie-id="${e.id}">
         <div class="gradient"></div>
         <img class="movie-img" src="https://image.tmdb.org/t/p/original/${e.poster_path}" alt="${e.overview}" loading="lazy" />
         <div class="info">
          <div class="name-and-discr">
           <p class="movie-title">${e.title}</p>
           <p class="movie-description">${i} | ${e.release_date.slice(0,4)}</p>
          </div>
          <div class="rating-body stars">
            <div class="rating-active" style="width:${10*e.vote_average}%"></div>
          </div>
        </div>
       </li>`;l.insertAdjacentHTML("beforeend",t)}}if(!a){let e=`<p class="oops-text">OOPS...<br>
     We are very sorry!<br>
     We didn't find movies with this genre.</p>`;l.innerHTML=e,d.classList.remove("visually-hidden"),n.classList.add("visually-hidden")}}async function p(e){let i=`${s.refs.BASIC_URL}${s.refs.movie_detailes}${e}?api_key=${s.refs.API_KEY}`,t=await fetch(i),a=await t.json(),l=a.genres.slice(0,2).map(({name:e})=>e.toLowerCase());return l}m.addEventListener("click",f),a("7dfxV"),a("lSnTn"),a("gOgzM"),a("5hhfL"),a("itgY7");
//# sourceMappingURL=my-library.32aa804a.js.map
