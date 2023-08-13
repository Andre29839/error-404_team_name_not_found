import{L as d,r as b}from"./modal-footer-cf93ec39.js";const{BASIC_URL:v,API_KEY:u,trending_week:I,new_films:$,movie_detailes:M}=b,S="https://image.tmdb.org/t/p/original/",i={wrapper:document.querySelector(".month-wrapper"),addToLibraryBtn:document.querySelector('button[data-action="save"]'),container:document.querySelector(".container-img-weekly"),removeLibraryBtn:document.querySelector(".remove-from-library")};i.addToLibraryBtn.addEventListener("click",_);window.addEventListener("resize",k);i.removeLibraryBtn.addEventListener("click",B);JSON.parse(localStorage.getItem(d));let c;async function x(){const e=`${v}${$}?api_key=${u}`,t=await(await fetch(e)).json();if(t.results.length===0){const n=`<p class="error-text">OOPS...<br>
     We are very sorry!<br>
     We can't find a movie for you to watch.</p>`;return i.wrapper.insertAdjacentHTML("afterbegin",n),[]}const s=Math.floor(Math.random()*t.results.length);return c=t.results[s],[c]}function _(){const e=c.id,r=JSON.parse(localStorage.getItem(d))||[],t=r.findIndex(s=>s.id===e);t?(r.push(c),localStorage.setItem(d,JSON.stringify(r)),i.addToLibraryBtn.classList.add("visually-hidden"),i.removeLibraryBtn.classList.remove("visually-hidden")):(r.splice(t,1),localStorage.setItem(d,JSON.stringify(r)),i.addToLibraryBtn.classList.remove("visually-hidden"),i.removeLibraryBtn.classList.add("visually-hidden"))}function B(e){const r=e.currentTarget.dataset.action,t=JSON.parse(localStorage.getItem(d))||[],s=t.findIndex(n=>n.id===Number(r));s&&(t.splice(s,1),localStorage.setItem(d,JSON.stringify(t)),g(r))}function k(){window.innerWidth===768&&w()}async function h(e){const r=`${v}${M}${e}?api_key=${u}`;return(await(await fetch(r)).json()).genres.slice(0,2).map(({name:a})=>a).join(", ")}let f=[];async function T(){const e=`${v}${I}?api_key=${u}`,t=await(await fetch(e)).json();let s=3;window.innerWidth>=320&&window.innerWidth<768?s=1:window.innerWidth>=768&&window.innerWidth<1280&&(s=3);const n=[];for(let a=0;a<s;a+=1){let o;do o=Math.floor(Math.random()*t.results.length);while(f.includes(t.results[o].id));f.push(t.results[o].id),n.push(t.results[o])}return n}async function w(){try{const e=await T();O(e)}catch(e){console.log("Error fetching or rendering movies:",e)}}w();async function O(e){let r="";for(const t of e){const{title:s,id:n,poster_path:a,release_date:o,overview:l,vote_average:p}=t,m=await h(n);r+=`<li class="movie-card open-modal" data-movie-id="${n}">
         <div class="gradient"></div>
         <img class="movie-img" src="https://image.tmdb.org/t/p/original/${a}" alt="${l}" loading="lazy" />
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
         </li>`}i.container.insertAdjacentHTML("beforeend",r)}async function E(){try{const e=await x();R(e),g(e)}catch(e){console.log("Error fetching or rendering movies:",e)}}E();async function R(e){let r="";for(const t of e){const{title:s,id:n,backdrop_path:a,release_date:o,vote_average:l,vote_count:p,popularity:m,overview:y}=t,L=await h(n);r+=`<li data-id="${n}" class="js-card-month">
      <img src="${S}${a}" alt="" class="month-img">
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
      </div>`,g(t)}i.wrapper.insertAdjacentHTML("beforeend",r)}function g(e){const r=typeof e=="number"?e:e.id;(JSON.parse(localStorage.getItem(d))||[]).findIndex(n=>n.id===r)===-1?(i.addToLibraryBtn.classList.remove("visually-hidden"),i.removeLibraryBtn.classList.add("visually-hidden")):(i.addToLibraryBtn.classList.add("visually-hidden"),i.removeLibraryBtn.classList.remove("visually-hidden"))}
