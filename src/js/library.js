import { LIBRARY_KEY,refs } from './helpers';

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


async function createMarkupToLibrary(array) {
  let markupLibrary ='';
  for (const elem of array) {
    const {
      title,
      id,
      poster_path,
      release_date,
      overview,
      vote_average,
    } = elem;
const movieWeekGenre = await getGenres(id);
const WEEK_IMG_URL = 'https://image.tmdb.org/t/p/original/';
markupLibrary += `<li class="movie-card open-modal" data-movie-id="${id}">
         <div class="gradient"></div>
         <img class="movie-img" src="${WEEK_IMG_URL}${poster_path
         }" alt="${overview}" loading="lazy" />
         <div class="info">
        <div class="name-and-discr">
         <p class="movie-title">
         ${title}
         </p>
         <p class="movie-description">
         ${movieWeekGenre} | ${release_date.slice(0, 4)}
         </p></div>
         <div class="rating-body stars">
      <div class="rating-active" style="width:${vote_average * 10}%"></div>
    </div>
  </div>
         </li>`}
return myLibraryDiv.insertAdjacentHTML('beforeend',markupLibrary);
};

async function renderFavoriteFilm() {
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
       filterButton.classList.add("visually-hidden");

     } else {
       
      const libraryFilmMarkup = await createMarkupToLibrary(currentMovies);

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



const dropdownList = document.querySelector(".dropdown-list");
dropdownList.addEventListener("click", findFilmWidthGenre);



async function findFilmWidthGenre(e) {
  e.preventDefault()
  const myMovies = JSON.parse(localStorage.getItem(LIBRARY_KEY)) || [];
  const dataName = e.target.dataset.name;
  myLibraryDiv.innerHTML = "";

  const GENRE_IMG_URL = 'https://image.tmdb.org/t/p/original/';

  let hasMatchingMovies = false;

  for (const movie of myMovies) {
    const genreOfMovie = await getGenres(movie.id);

    if (genreOfMovie.includes(dataName)) {
      hasMatchingMovies = true;

      const markupGanre = `<li class="movie-card open-modal" data-movie-id="${movie.id}">
         <div class="gradient"></div>
         <img class="movie-img" src="${GENRE_IMG_URL}${movie.poster_path}" alt="${movie.overview}" loading="lazy" />
         <div class="info">
          <div class="name-and-discr">
           <p class="movie-title">${movie.title}</p>
           <p class="movie-description">${genreOfMovie} | ${movie.release_date.slice(0, 4)}</p>
          </div>
          <div class="rating-body stars">
            <div class="rating-active" style="width:${movie.vote_average * 10}%"></div>
          </div>
        </div>
       </li>`;

      myLibraryDiv.insertAdjacentHTML("beforeend", markupGanre);
    }
    
  }

  if (!hasMatchingMovies) {
    const oopsMarkup = `<p class="oops-text">OOPS...<br>
     We are very sorry!<br>
     We didn't find movies with this genre.</p>`;

    myLibraryDiv.innerHTML = oopsMarkup;
    buttonSearch.classList.remove("visually-hidden");
    buttonLoadMore.classList.add("visually-hidden");
  }
}


async function getGenres(movieId) {
  const urlGenres = `${refs.BASIC_URL}${refs.movie_detailes}${movieId}?api_key=${refs.API_KEY}`;
  const response = await fetch(urlGenres);
  const datas = await response.json();
  const genres = datas.genres.slice(0, 2).map(({ name }) => name.toLowerCase());

  return genres;
}















      










 