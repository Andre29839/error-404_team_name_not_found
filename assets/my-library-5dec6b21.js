import{L as g,r as v}from"./modal-footer-4eaf95cc.js";const r=document.querySelector("#my-library"),l=document.querySelector(".search-movie-btn-link"),o=document.querySelector(".load-more-btn"),y=document.querySelector(".filter-down-button"),u=document.querySelector(".dropdown-list"),m=JSON.parse(localStorage.getItem(g))||[];let L=1;const p=9;o.addEventListener("click",_);u.addEventListener("click",function(t){if(t.target.tagName!=="A")return;let s=t.target.textContent;y.textContent=s});y.addEventListener("click",function(){u.classList.toggle("visually-hidden"),u.classList.toggle("active")});async function M(t){let s="";for(const i of t){const{title:a,id:n,poster_path:e,release_date:d,overview:c,vote_average:b}=i,$=await h(n);s+=`<li class="movie-card open-modal" data-movie-id="${n}">
         <div class="gradient"></div>
         <img class="movie-img" src="https://image.tmdb.org/t/p/original/${e}" alt="${c}" loading="lazy" />
         <div class="info">
        <div class="name-and-discr">
         <p class="movie-title">
         ${a}
         </p>
         <p class="movie-description">
         ${$} | ${d.slice(0,4)}
         </p></div>
         <div class="rating-body stars">
      <div class="rating-active" style="width:${b*10}%"></div>
    </div>
  </div>
         </li>`}return r.insertAdjacentHTML("beforeend",s)}async function f(){const t=(L-1)*p,s=t+p,i=m.slice(t,s);if(m.length===0){const a=`<p class="oops-text">OOPS...<br>
     We are very sorry!<br>
     You don’t have any movies at your library.</p>`;r.insertAdjacentHTML("afterBegin",a),l.classList.remove("visually-hidden"),o.classList.add("visually-hidden")}else await M(i),l.classList.add("visually-hidden"),o.classList.remove("visually-hidden"),s>=m.length?(o.classList.add("visually-hidden"),l.classList.remove("visually-hidden")):o.classList.remove("visually-hidden")}f();function _(){L+=1,f()}const w=document.querySelector(".dropdown-list");w.addEventListener("click",S);async function S(t){t.preventDefault();const s=JSON.parse(localStorage.getItem(g))||[],i=t.target.dataset.name;r.innerHTML="";const a="https://image.tmdb.org/t/p/original/";let n=!1;for(const e of s){const d=await h(e.id);if(d.includes(i)){n=!0;const c=`<li class="movie-card open-modal" data-movie-id="${e.id}">
         <div class="gradient"></div>
         <img class="movie-img" src="${a}${e.poster_path}" alt="${e.overview}" loading="lazy" />
         <div class="info">
          <div class="name-and-discr">
           <p class="movie-title">${e.title}</p>
           <p class="movie-description">${d} | ${e.release_date.slice(0,4)}</p>
          </div>
          <div class="rating-body stars">
            <div class="rating-active" style="width:${e.vote_average*10}%"></div>
          </div>
        </div>
       </li>`;r.insertAdjacentHTML("beforeend",c)}}if(!n){const e=`<p class="oops-text">OOPS...<br>
     We are very sorry!<br>
     We didn't find movies with this genre.</p>`;r.innerHTML=e,l.classList.remove("visually-hidden"),o.classList.add("visually-hidden")}}async function h(t){const s=`${v.BASIC_URL}${v.movie_detailes}${t}?api_key=${v.API_KEY}`;return(await(await fetch(s)).json()).genres.slice(0,2).map(({name:e})=>e.toLowerCase())}
