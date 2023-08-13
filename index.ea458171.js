let e;var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},a={},r={},i=t.parcelRequired9c8;null==i&&((i=function(e){if(e in a)return a[e].exports;if(e in r){var t=r[e];delete r[e];var i={id:e,exports:{}};return a[e]=i,t.call(i.exports,i,i.exports),i.exports}var s=Error("Cannot find module '"+e+"'");throw s.code="MODULE_NOT_FOUND",s}).register=function(e,t){r[e]=t},t.parcelRequired9c8=i),i("aER9F"),i("dd1Kv"),i("ge6e3"),i("itgY7"),i("7dfxV"),i("lSnTn"),i("hO2jc");var s=i("ge6e3");const{BASIC_URL:n,API_KEY:l,trending_week:o,new_films:d,movie_detailes:c}=s.refs,p={wrapper:document.querySelector(".month-wrapper"),addToLibraryBtn:document.querySelector('button[data-action="save"]'),container:document.querySelector(".container-img-weekly"),removeLibraryBtn:document.querySelector(".remove-from-library")};async function v(){try{let t=`${n}${d}?api_key=${l}`,a=await fetch(t),r=await a.json();if(0===r.results.length)return;let i=Math.floor(Math.random()*r.results.length);return[e=r.results[i]]}catch(e){console.log("Error fetching or rendering movies:",e),p.addToLibraryBtn.classList.add("visually-hidden"),p.wrapper.insertAdjacentHTML("afterbegin",'<p class="error-text">Oops...<br> Something went wrong.<br> Please try again later.</p>');return}}async function u(e){let t=`${n}${c}${e}?api_key=${l}`,a=await fetch(t),r=await a.json(),i=r.genres.slice(0,2).map(({name:e})=>e).join(", ");return i}p.addToLibraryBtn.addEventListener("click",function(){let t=e.id,a=JSON.parse(localStorage.getItem(s.LIBRARY_KEY))||[],r=a.findIndex(e=>e.id===t);r?(a.push(e),localStorage.setItem(s.LIBRARY_KEY,JSON.stringify(a)),p.addToLibraryBtn.classList.add("visually-hidden"),p.removeLibraryBtn.classList.remove("visually-hidden")):(a.splice(r,1),localStorage.setItem(s.LIBRARY_KEY,JSON.stringify(a)),p.addToLibraryBtn.classList.remove("visually-hidden"),p.removeLibraryBtn.classList.add("visually-hidden"))}),p.removeLibraryBtn.addEventListener("click",function(e){let t=e.currentTarget.dataset.action,a=JSON.parse(localStorage.getItem(s.LIBRARY_KEY))||[],r=a.findIndex(e=>e.id===Number(t));r&&(a.splice(r,1),localStorage.setItem(s.LIBRARY_KEY,JSON.stringify(a)),h(t))}),JSON.parse(localStorage.getItem(s.LIBRARY_KEY));let g=[];async function m(){let e=`${n}${o}?api_key=${l}`,t=await fetch(e),a=await t.json(),r=3;window.innerWidth<768?r=1:window.innerWidth>=768&&window.innerWidth<1280&&(r=3);let i=[];for(let e=0;e<r;e+=1){let e;do e=Math.floor(Math.random()*a.results.length);while(g.includes(a.results[e].id))g.push(a.results[e].id),i.push(a.results[e])}return i}async function y(e){let t="";for(let a of e){let{title:e,id:r,poster_path:i,release_date:s,overview:n,vote_average:l}=a,o=await u(r);t+=`<li class="movie-card open-modal" data-movie-id="${r}">
         <div class="gradient"></div>
         <img class="movie-img" src="https://image.tmdb.org/t/p/original/${i}" alt="${n}" loading="lazy" />
         <div class="info">
        <div class="name-and-discr">
         <p class="movie-title">
         ${e}
         </p>
         <p class="movie-description">
         ${o} | ${s.slice(0,4)}
         </p></div>
         <div class="rating-body stars">
      <div class="rating-active" style="width:${10*l}%"></div>
    </div>
  </div>
         </li>`}p.container.insertAdjacentHTML("beforeend",t)}async function f(e){let t="";for(let a of e){let{title:e,id:r,backdrop_path:i,release_date:s,vote_average:n,vote_count:l,popularity:o,overview:d}=a,c=await u(r);t+=`<li data-id="${r}" class="js-card-month">
      <img src="https://image.tmdb.org/t/p/original/${i}" alt="" class="month-img">
      </li>
      <div class = "wrapper-month">
      <h4 class="month-title-movie">${e}</h4>
      <div class="wrapper-month-section">
      <div class="description-wrapper-left">      
      <p class="release-text">Release date</p>
      <p class="descr-release-text">${s}</p>
      <p class="vote-text">Vote / Votes</p>
      <p class="descr-vote-text"><span class="vote-numbers">${n}</span> / <span class="votes-numbers">${l}</span></p>
      </div>
      <div class="description-wrapper-right">
      <p class="popularity-text">Popularity</p>
      <p class="descr-popularity-text">${o.toFixed(1)}</p>
      <p class="genre-text">Genre</p>
      <p class="descr-genre-text">${c}</p>
      </div>
      </div>
      <p class="about-text">ABOUT</p>
      <p class="description-text">${d}</p>
      </div>`,h(a)}p.wrapper.insertAdjacentHTML("beforeend",t)}function h(e){let t="number"==typeof e?e:e.id,a=JSON.parse(localStorage.getItem(s.LIBRARY_KEY))||[],r=a.findIndex(e=>e.id===t);-1===r?(p.addToLibraryBtn.classList.remove("visually-hidden"),p.removeLibraryBtn.classList.add("visually-hidden")):(p.addToLibraryBtn.classList.add("visually-hidden"),p.removeLibraryBtn.classList.remove("visually-hidden"))}(async function(){try{let e=await m();y(e)}catch(e){console.log("Error fetching or rendering movies:",e)}})(),async function(){try{let e=await v();f(e),h(e)}catch(e){console.log("Error fetching or rendering movies:",e)}}(),i("gOgzM"),i("5hhfL");
//# sourceMappingURL=index.ea458171.js.map
