let e;function t(e,t,r,a){Object.defineProperty(e,t,{get:r,set:a,enumerable:!0,configurable:!0})}var r="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},a={},i={},s=r.parcelRequired9c8;null==s&&((s=function(e){if(e in a)return a[e].exports;if(e in i){var t=i[e];delete i[e];var r={id:e,exports:{}};return a[e]=r,t.call(r.exports,r,r.exports),r.exports}var s=Error("Cannot find module '"+e+"'");throw s.code="MODULE_NOT_FOUND",s}).register=function(e,t){i[e]=t},r.parcelRequired9c8=s),s.register("27Lyk",function(e,r){t(e.exports,"register",()=>a,e=>a=e),t(e.exports,"resolve",()=>i,e=>i=e);var a,i,s={};a=function(e){for(var t=Object.keys(e),r=0;r<t.length;r++)s[t[r]]=e[t[r]]},i=function(e){var t=s[e];if(null==t)throw Error("Could not resolve bundle with id "+e);return t}}),s("27Lyk").register(JSON.parse('{"g3LtT":"index.9aaf5554.js","6bOCT":"defaultImage.9ccea655.jpg","21Hjo":"catalog.49dea8b3.js"}')),s("aER9F"),s("dd1Kv"),s("ge6e3"),s("itgY7"),s("7dfxV"),s("lSnTn"),s("hO2jc");var n=s("ge6e3"),o={};o=new URL(s("27Lyk").resolve("6bOCT"),import.meta.url).toString();const{BASIC_URL:l,API_KEY:d,trending_week:c,new_films:p,movie_detailes:u}=n.refs,g={wrapper:document.querySelector(".month-wrapper"),addToLibraryBtn:document.querySelector('button[data-action="save"]'),container:document.querySelector(".container-img-weekly"),removeLibraryBtn:document.querySelector(".remove-from-library")};async function v(){try{let t=`${l}${p}?api_key=${d}`,r=await fetch(t),a=await r.json();if(0===a.results.length)return;let i=Math.floor(Math.random()*a.results.length);return[e=a.results[i]]}catch(e){console.log("Error fetching or rendering movies:",e),g.addToLibraryBtn.classList.add("visually-hidden"),g.wrapper.insertAdjacentHTML("afterbegin",'<p class="error-text">Oops...<br> Something went wrong.<br> Please try again later.</p>');return}}async function m(e){let t=`${l}${u}${e}?api_key=${d}`,r=await fetch(t),a=await r.json(),i=a.genres.slice(0,2).map(({name:e})=>e).join(", ");return i}g.addToLibraryBtn.addEventListener("click",function(){let t=e.id,r=JSON.parse(localStorage.getItem(n.LIBRARY_KEY))||[],a=r.findIndex(e=>e.id===t);a?(r.push(e),localStorage.setItem(n.LIBRARY_KEY,JSON.stringify(r)),g.addToLibraryBtn.classList.add("visually-hidden"),g.removeLibraryBtn.classList.remove("visually-hidden")):(r.splice(a,1),localStorage.setItem(n.LIBRARY_KEY,JSON.stringify(r)),g.addToLibraryBtn.classList.remove("visually-hidden"),g.removeLibraryBtn.classList.add("visually-hidden"))}),g.removeLibraryBtn.addEventListener("click",function(e){let t=e.currentTarget.dataset.action,r=JSON.parse(localStorage.getItem(n.LIBRARY_KEY))||[],a=r.findIndex(e=>e.id===Number(t));a&&(r.splice(a,1),localStorage.setItem(n.LIBRARY_KEY,JSON.stringify(r)),w(t))}),JSON.parse(localStorage.getItem(n.LIBRARY_KEY));let f=[];async function y(){let e=`${l}${c}?api_key=${d}`,t=await fetch(e),r=await t.json(),a=3;window.innerWidth<768?a=1:window.innerWidth>=768&&window.innerWidth<1280&&(a=3);let i=[];for(let e=0;e<a;e+=1){let e;do e=Math.floor(Math.random()*r.results.length);while(f.includes(r.results[e].id))f.push(r.results[e].id),i.push(r.results[e])}return i}async function h(e){let t="";for(let r of e){let{title:e,id:a,poster_path:i,release_date:s,overview:n,vote_average:o}=r,l=await m(a);t+=`<li class="movie-card open-modal" data-movie-id="${a}">
         <div class="gradient"></div>
         <img class="movie-img" src="https://image.tmdb.org/t/p/original/${i}" alt="${n}" loading="lazy" />
         <div class="info">
        <div class="name-and-discr">
         <p class="movie-title">
         ${e}
         </p>
         <p class="movie-description">
         ${l} | ${s.slice(0,4)}
         </p></div>
         <div class="rating-body stars">
      <div class="rating-active" style="width:${10*o}%"></div>
    </div>
  </div>
         </li>`}g.container.insertAdjacentHTML("beforeend",t)}async function b(e){let t="";for(let r of e){let{title:e,id:a,backdrop_path:i,release_date:s,vote_average:n,vote_count:l,popularity:d,overview:c,poster_path:p}=r,u=await m(a),g=window.innerWidth<768?p||o.defaultImage:i||o.defaultImage;t+=`<li data-id="${a}" class="js-card-month">
    <img width="280px" height="402px" src="${"https://image.tmdb.org/t/p/original/"+g}" alt="${c}" class="month-img"></img>
      </li>
      <div class = "wrapper-month">
      <h4 class="month-title-movie">${e}</h4>
      <div class="wrapper-month-section">
      <ul class="trends-wrapper"> 
      <p class="release-text">Release date</p>
      <p class="vote-text">Vote / Votes</p>
      <p class="popularity-text">Popularity</p>
      <p class="genre-text">Genre</p>
      </ul>  
      <ul class="trends-wrapper-second"> 
      <p class="descr-release-text">${s}</p>
      <p class="descr-vote-text"><span class="vote-numbers">${n}</span> / <span class="votes-numbers">${l}</span></p>
      <p class="descr-popularity-text">${d.toFixed(1)}</p>
      <p class="descr-genre-text">${u}</p>
      </ul>  
      </div>
      <p class="about-text">ABOUT</p>
      <p class="description-text">${c}</p>
      </div>`,w(r)}g.wrapper.insertAdjacentHTML("beforeend",t)}function w(e){let t="number"==typeof e?e:e.id,r=JSON.parse(localStorage.getItem(n.LIBRARY_KEY))||[],a=r.findIndex(e=>e.id===t);-1===a?(g.addToLibraryBtn.classList.remove("visually-hidden"),g.removeLibraryBtn.classList.add("visually-hidden")):(g.addToLibraryBtn.classList.add("visually-hidden"),g.removeLibraryBtn.classList.remove("visually-hidden"))}(async function(){try{let e=await y();h(e)}catch(e){console.log("Error fetching or rendering movies:",e)}})(),async function(){try{let e=await v();b(e),w(e)}catch(e){console.log("Error fetching or rendering movies:",e)}}(),s("gOgzM"),s("5hhfL");
//# sourceMappingURL=index.9aaf5554.js.map
