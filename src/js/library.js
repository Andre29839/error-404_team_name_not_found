import { LIBRARY_KEY } from './helpers';
const myLibraryDiv = document.querySelector("#my-library");
const buttonSearch = document.querySelector(".search-movie-btn-link");
const buttonLoadMore = document.querySelector(".load-more-btn");
const filterButton = document.querySelector(".filter-down-button");
const listOfGenre = document.querySelector(".dropdown-list");
const savedMovies = JSON.parse(localStorage.getItem(LIBRARY_KEY)) || [];

let page = 1;
const moviesPerPage = 9;

buttonLoadMore.addEventListener("click", onClickBtnLoadMore);
listOfGenre.addEventListener("click", function (e) {
  if (e.target.tagName !== 'A') { return } 
 
  let eventText = e.target.textContent;
  filterButton.textContent = eventText;
  

});
filterButton.addEventListener("click", function () {
  listOfGenre.classList.toggle("visually-hidden");
  listOfGenre.classList.toggle("active");
   
})


function createMarkupToLibrary(array) {
    const WEEK_IMG_URL = 'https://image.tmdb.org/t/p/original/';
   const markup =  array.map(({poster_path
,genre_ids,title,release_date,id,vote_average,overview

    }) => 
        `<li class="movie-card open-modal" data-movie-id="${id}">
        <div class="gradient"></div>
    <img class="movie-img" src="${WEEK_IMG_URL}${poster_path
}" alt="${overview}" loading="lazy" />
    <div class="info">
      <p class="movie-title">
        ${title}
      </p>
      <p class="movie-description">
        ${genre_ids} | ${release_date}
      </p>
      <p class="movie-rating">
        ${vote_average}
      </p>
    </div>
  </li>`
   ).join('');
    return markup;
};

function renderFavoriteFilm() {
  const startIdx = (page - 1) * moviesPerPage;
  const endIdx = startIdx + moviesPerPage;
  const currentMovies = savedMovies.slice(startIdx, endIdx);
     if (savedMovies.length === 0) {
        const oopsMarkup = `<p class="oops-text">OOPS...<br>
     We are very sorry!<br>
     You don’t have any movies at your library.</p>`
         myLibraryDiv.insertAdjacentHTML("afterBegin", oopsMarkup);
         buttonSearch.classList.remove("visually-hidden");
         buttonLoadMore.classList.add("visually-hidden");

     } else {
       
      const libraryFilmMarkup = createMarkupToLibrary(currentMovies);
       myLibraryDiv.insertAdjacentHTML("beforeend", libraryFilmMarkup);
         buttonSearch.classList.add("visually-hidden");
         buttonLoadMore.classList.remove("visually-hidden"); 
       
        if (endIdx >= savedMovies.length) {
          buttonLoadMore.classList.add("visually-hidden");
          buttonSearch.classList.remove("visually-hidden")
    } else {
          buttonLoadMore.classList.remove("visually-hidden");
          
    }
       
     }
    
}
renderFavoriteFilm()


function onClickBtnLoadMore() {
  page += 1;
  renderFavoriteFilm();
}







