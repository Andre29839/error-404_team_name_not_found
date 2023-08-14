import Pagination from 'tui-pagination';
import { refs } from "./helpers";
import { modalMovieInfoMarkup } from "./modal-menu";

const { API_KEY, BASIC_URL, search_films, trending_week, new_films } = refs;

const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
<<<<<<< Updated upstream
 
=======
const paginationDiv = document.querySelector('.tui-pagination');
const svgReset = document.querySelector('.svg-reset');
const sectionContainer = document.querySelector('.section-container');

const pagContainer = document.getElementById('pagination');
let totalResults;
const totalMovie = totalResults;
const itemsPerPage = 20;
const visiblePage = 4;

>>>>>>> Stashed changes
let input;
let userParams = {
  primary_release_year: '',
  year: '',
  query: '',
  page: 1,
}

searchForm.addEventListener('submit', onSubmitForm);
svgReset.addEventListener('click', onClickSvgReset);

function onClickSvgReset() {
  searchForm.reset();
 svgReset.classList.add("visually-hidden");
}



async function fetchFilms() { 
    const response = await fetch(`${BASIC_URL}${new_films}?api_key=${API_KEY}`)
  const moviesData = await response.json(); 
  console.log(moviesData);
  return moviesData.results;
}

function createDefaultMarkup(pictures) {
const WEEK_IMG_URL = 'https://image.tmdb.org/t/p/original/';
const markup = pictures.map(({ title, poster_path, genre_ids, vote_average, overview, release_date}) => 
 `<li class="movie-card">
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
  </li>`).join('');
  return markup;
}

// .....................................

// .........................................

// МОДАЛЬНЕ ВІКНО
function openMovieModal(movieData) {
  const modal = document.getElementById('modal');
  const modalContent = document.getElementById('modal-content');

  const modalMarkup = modalMovieInfoMarkup(movieData);
  modalContent.innerHTML = modalMarkup;
  modal.style.display = 'block';
}
   
async function appendMarkup() {
  try {


<<<<<<< Updated upstream
    const movies = await fetchFilms();
    const markupCreate = createDefaultMarkup(movies);
    gallery.insertAdjacentHTML('beforeend', markupCreate);

    const movieCards = document.querySelectorAll('.movie-card');

    movieCards.forEach(movieCard => {
      movieCard.addEventListener('click', () => {
        const title = movieCard.querySelector('.movie-title').textContent;
        const description = movieCard.querySelector('.movie-description').textContent;
        const rating = movieCard.querySelector('.movie-rating').textContent;
        const imgSrc = movieCard.querySelector('.movie-img').src;

          const movieData = {
          title,
          description,
          rating,
          imgSrc,
        };
        openMovieModal(movieData);
      })
    })

  } catch(error) {
    console.log(error);
  }
}
appendMarkup();

// ВІДПРАВКА ФОРМИ
function onSubmitForm(e) {
=======
   searchForm.elements.searchQuery.addEventListener("focus", function() {
  svgReset.classList.remove("visually-hidden");
});


 async function onSubmitForm(e) {
>>>>>>> Stashed changes
  e.preventDefault();

  const dataText = searchForm.elements.searchQuery.value;
  input = dataText;
<<<<<<< Updated upstream
=======
   
   e.target.reset();
   svgReset.classList.add("visually-hidden");
   gallery.innerHTML = '';
   
   
  if (dataText.trim() === '') {
    const oopsMarkup = `<p class="oops-text">OOPS...<br>
     We are very sorry!<br>
     We don’t have any results matching your search.</p>`
    gallery.innerHTML = oopsMarkup;
    paginationDiv.classList.add("visually-hidden");
    return;
  }
  paginationDiv.classList.remove("visually-hidden");
>>>>>>> Stashed changes
  
     e.target.reset();
  gallery.innerHTML = '';
  
  if (dataText.trim() === '') {
  return alert('???')
  }
  userParams.query = input;
  getFilmsOnSearch();
}




async function getFilmsOnSearch() {
  const params = new URLSearchParams({
    api_key: API_KEY,
    query: userParams.query,
    include_adult: false,
    primary_release_year: userParams.primary_release_year,
    page: userParams.page,
    region: '',
    year: userParams.year,
  })
  try {
    const response = await fetch(`${BASIC_URL}${new_films}?${params}`);
    const searchData = await response.json();
    const searchResults = searchData.results;

    const markupSearchResults = createDefaultMarkup(searchResults);
    gallery.insertAdjacentHTML('beforeend', markupSearchResults)
  } catch (error) {
    console.log(error);
  }
}


// ПАГІНАЦІЯ
const pagContainer = document.getElementById('pagination');
const totalMovie = 100;
const itemsPerPage = 20;
const visiblePage = 4;

const options = { 
     totalItems: totalMovie,
     itemsPerPage: itemsPerPage,
     visiblePages: visiblePage,
     centerAlign: true,
     template: {
         page: '<a href="#" class="tui-page-btn">{{page}}</a>',
         currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
         moveButton:
             '<a href="#" class="tui-page-btn tui-{{type}}">' +
                 '<span class="tui-ico-{{type}}">{{type}}</span>' +
             '</a>',
         disabledMoveButton:
             '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
                 '<span class="tui-ico-{{type}}">{{type}}</span>' +
             '</span>',
         moreButton:
             '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
                 '<span class="tui-ico-ellip">...</span>' +
             '</a>'
     }
};
const pagination = new Pagination(pagContainer, options);

pagination.on('afterMove', e => {
  const currentPage = e.page;
  userParams.page = currentPage;
  loadMoviesForPage(currentPage)
})

let currentPage = 1;
let movies = [];

async function loadMoviesForPage(page) {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  try {
    userParams.page = page;
    const response = await fetch(`${BASIC_URL}${new_films}?api_key=${API_KEY}&query=${userParams.query}&include_adult=false&primary_release_year=${userParams.primary_release_year}&page=${page}&region=&year=${userParams.year}`);
    const moviesData = await response.json();
    movies = moviesData.results.slice(startIndex, endIndex);

    const markupCreate = createDefaultMarkup(movies);
    gallery.innerHTML = markupCreate;

    getFilmsOnSearch();
  } catch (error) {
    console.log(error);
  }
}


<<<<<<< Updated upstream

=======
let paginationInstance = new Pagination(pagContainer, options);
paginationInstance.on('afterMove', e => {
  if (typeFetch === 'trending') {
    loadTrendingMovies(e.page);
      sectionContainer.scrollIntoView({ behavior: "smooth" });
    return;
  };

      const currentPage = e.page;
      userParams.page = currentPage;

      loadMoviesForPage(currentPage);
      updatePaginationMarkup(currentPage);
});
    
async function appendMarkup() {
  try {
    const movies = await fetchFilms();
    resultsArr = movies.total_results || 0;
 if (resultsArr === 0) {
      const oopsMarkup = `<p class="oops-text">OOPS...<br>
        We are very sorry!<br>
        We don’t have any results matching your search.</p>`;
      gallery.innerHTML = oopsMarkup;
      paginationDiv.classList.add("visually-hidden");
      return;
    }
   createDefaultMarkup(movies.results);

    if (!userParams.query) {
      loadMoviesForPage(currentPage);
    }
    
  } catch (error) {
    console.log(error);
  }
  return resultsArr;
}


async function onLoad() {
 const total = await loadTrendingMovies();
  paginationInstance.reset(total);
}
onLoad();

async function loadTrendingMovies(page=1) {
  try {
    const response = await fetch(`${BASIC_URL}${trending_week}?api_key=${API_KEY}&page=${page}`);
    const moviesData = await response.json();
    movies = moviesData.results;

   createDefaultMarkup(movies);
    options.totalItems = moviesData.total_results;
    totalResults = moviesData.total_results;
return totalResults
  } catch (error) {
   const oopsMarkup = `<p class="oops-text">OOPS...<br>
     We are very sorry!<br>
     Something went wrong!</p>`
         gallery.innerHTML = oopsMarkup;
    paginationDiv.classList.add("visually-hidden");
    return; 
  }
}
>>>>>>> Stashed changes
