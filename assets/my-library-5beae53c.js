import{L as h,a as b}from"./modal-footer-b783a096.js";const d=document.querySelector("#my-library"),o=document.querySelector(".search-movie-btn-link"),s=document.querySelector(".load-more-btn"),v=document.querySelector(".filter-down-button"),r=document.querySelector(".dropdown-list"),n=JSON.parse(localStorage.getItem(h))||[];let u=1;const c=9;s.addEventListener("click",k);r.addEventListener("click",function(e){if(e.target.tagName!=="A")return;let t=e.target.textContent;v.textContent=t});v.addEventListener("click",function(){r.classList.toggle("visually-hidden"),r.classList.toggle("active")});async function M(e){let t="";for(const i of e){const{title:a,id:l,poster_path:y,release_date:g,overview:L,vote_average:p}=i,f=await b(l);t+=`<li class="movie-card open-modal" data-movie-id="${l}">
         <div class="gradient"></div>
         <img class="movie-img" src="https://image.tmdb.org/t/p/original/${y}" alt="${L}" loading="lazy" />
         <div class="info">
        <div class="name-and-discr">
         <p class="movie-title">
         ${a}
         </p>
         <p class="movie-description">
         ${f} | ${g.slice(0,4)}
         </p></div>
         <div class="rating-body stars">
      <div class="rating-active" style="width:${p*10}%"></div>
    </div>
  </div>
         </li>`}return d.insertAdjacentHTML("beforeend",t)}async function m(){const e=(u-1)*c,t=e+c,i=n.slice(e,t);if(n.length===0){const a=`<p class="oops-text">OOPS...<br>
     We are very sorry!<br>
     You don’t have any movies at your library.</p>`;d.insertAdjacentHTML("afterBegin",a),o.classList.remove("visually-hidden"),s.classList.add("visually-hidden")}else await M(i),o.classList.add("visually-hidden"),s.classList.remove("visually-hidden"),t>=n.length?(s.classList.add("visually-hidden"),o.classList.remove("visually-hidden")):s.classList.remove("visually-hidden")}m();function k(){u+=1,m()}
