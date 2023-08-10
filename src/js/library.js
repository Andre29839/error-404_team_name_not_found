import { LIBRARY_KEY } from './helpers';
const myLibraryDiv = document.querySelector("#my-library");
const buttonSearch = document.querySelector(".search-movie-btn-link");
const buttonLoadMore = document.querySelector(".load-more-btn");
const select = document.querySelector(".genre-select");

const savedMovies = JSON.parse(localStorage.getItem(LIBRARY_KEY)) || [];
// const arrayOfFilms = JSON.parse(localStorage.getItem(LIBRARY_KEY));


function createMarkupToLibrary(array) {
    const WEEK_IMG_URL = 'https://image.tmdb.org/t/p/original/';
   const markup =  array.map(({poster_path
,genre_ids,title,release_date,id,vote_average,overview

    }) => 
        `<li class="movie-card">
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

// function createSelect() {
    
// }

function renderFavoriteFilm() {
     if (savedMovies.length === 0) {
        const oopsMarkup = `<p class="oops-text">OOPS...<br>
     We are very sorry!<br>
     You don’t have any movies at your library.</p>`
         myLibraryDiv.insertAdjacentHTML("afterBegin", oopsMarkup);
         buttonSearch.classList.remove("visually-hidden");
         buttonLoadMore.classList.add("visually-hidden");

     } else {
         
     const libraryFilmMarkup = createMarkupToLibrary(savedMovies);
         myLibraryDiv.insertAdjacentHTML("beforeend", libraryFilmMarkup);
         buttonSearch.classList.add("visually-hidden");
         buttonLoadMore.classList.remove("visually-hidden"); 
         select.classList.remove("visually-hidden");
     }
    
}
renderFavoriteFilm()