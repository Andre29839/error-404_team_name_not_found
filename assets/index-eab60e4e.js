import{L as d,r as b}from"./modal-footer-f25fd6a6.js";const{BASIC_URL:v,API_KEY:g,trending_week:w,new_films:I,movie_detailes:$}=b,M="https://image.tmdb.org/t/p/original/",n={wrapper:document.querySelector(".month-wrapper"),addToLibraryBtn:document.querySelector('button[data-action="save"]'),container:document.querySelector(".container-img-weekly"),removeLibraryBtn:document.querySelector(".remove-from-library")};n.addToLibraryBtn.addEventListener("click",x);n.removeLibraryBtn.addEventListener("click",_);JSON.parse(localStorage.getItem(d));let c;async function S(){try{const e=`${v}${I}?api_key=${g}`,r=await(await fetch(e)).json();if(r.results.length===0)return;const s=Math.floor(Math.random()*r.results.length);return c=r.results[s],[c]}catch(e){console.log("Error fetching or rendering movies:",e);const t='<p class="error-text">Oops...<br> Something went wrong.<br> Please try again later.</p>';n.addToLibraryBtn.classList.add("visually-hidden"),n.wrapper.insertAdjacentHTML("afterbegin",t);return}}function x(){const e=c.id,t=JSON.parse(localStorage.getItem(d))||[],r=t.findIndex(s=>s.id===e);r?(t.push(c),localStorage.setItem(d,JSON.stringify(t)),n.addToLibraryBtn.classList.add("visually-hidden"),n.removeLibraryBtn.classList.remove("visually-hidden")):(t.splice(r,1),localStorage.setItem(d,JSON.stringify(t)),n.addToLibraryBtn.classList.remove("visually-hidden"),n.removeLibraryBtn.classList.add("visually-hidden"))}function _(e){const t=e.currentTarget.dataset.action,r=JSON.parse(localStorage.getItem(d))||[],s=r.findIndex(a=>a.id===Number(t));s&&(r.splice(s,1),localStorage.setItem(d,JSON.stringify(r)),u(t))}async function f(e){const t=`${v}${$}${e}?api_key=${g}`;return(await(await fetch(t)).json()).genres.slice(0,2).map(({name:i})=>i).join(", ")}let h=[];async function B(){const e=`${v}${w}?api_key=${g}`,r=await(await fetch(e)).json();let s=3;window.innerWidth<768?s=1:window.innerWidth>=768&&window.innerWidth<1280&&(s=3);const a=[];for(let i=0;i<s;i+=1){let o;do o=Math.floor(Math.random()*r.results.length);while(h.includes(r.results[o].id));h.push(r.results[o].id),a.push(r.results[o])}return a}async function T(){try{const e=await B();k(e)}catch(e){console.log("Error fetching or rendering movies:",e)}}T();async function k(e){let t="";for(const r of e){const{title:s,id:a,poster_path:i,release_date:o,overview:l,vote_average:p}=r,m=await f(a);t+=`<li class="movie-card open-modal" data-movie-id="${a}">
         <div class="gradient"></div>
         <img class="movie-img" src="https://image.tmdb.org/t/p/original/${i}" alt="${l}" loading="lazy" />
         <div class="info">
        <div class="name-and-discr">
         <p class="movie-title">
         ${s}
         </p>
         <p class="movie-description">
         ${m} | ${o.slice(0,4)}
         </p></div>
         <div class="rating-body stars">
      <div class="rating-active" style="width:${p*10}%"></div>
    </div>
  </div>
         </li>`}n.container.insertAdjacentHTML("beforeend",t)}async function E(){try{const e=await S();O(e),u(e)}catch(e){console.log("Error fetching or rendering movies:",e)}}E();async function O(e){let t="";for(const r of e){const{title:s,id:a,backdrop_path:i,release_date:o,vote_average:l,vote_count:p,popularity:m,overview:y}=r,L=await f(a);t+=`<li data-id="${a}" class="js-card-month">
      <img src="${M}${i}" alt="" class="month-img">
      </li>
      <div class = "wrapper-month">
      <h4 class="month-title-movie">${s}</h4>
      <div class="wrapper-month-section">
      <div class="description-wrapper-left">      
      <p class="release-text">Release date</p>
      <p class="descr-release-text">${o}</p>
      <p class="vote-text">Vote / Votes</p>
      <p class="descr-vote-text"><span class="vote-numbers">${l}</span> / <span class="votes-numbers">${p}</span></p>
      </div>
      <div class="description-wrapper-right">
      <p class="popularity-text">Popularity</p>
      <p class="descr-popularity-text">${m.toFixed(1)}</p>
      <p class="genre-text">Genre</p>
      <p class="descr-genre-text">${L}</p>
      </div>
      </div>
      <p class="about-text">ABOUT</p>
      <p class="description-text">${y}</p>
      </div>`,u(r)}n.wrapper.insertAdjacentHTML("beforeend",t)}function u(e){const t=typeof e=="number"?e:e.id;(JSON.parse(localStorage.getItem(d))||[]).findIndex(a=>a.id===t)===-1?(n.addToLibraryBtn.classList.remove("visually-hidden"),n.removeLibraryBtn.classList.add("visually-hidden")):(n.addToLibraryBtn.classList.add("visually-hidden"),n.removeLibraryBtn.classList.remove("visually-hidden"))}
