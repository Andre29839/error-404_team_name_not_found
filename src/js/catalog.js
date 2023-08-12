import Pagination from 'tui-pagination';
import { refs, getGenres } from "./helpers";


const { API_KEY, BASIC_URL, search_films, trending_week, new_films } = refs;

const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const paginationDiv = document.querySelector('.tui-pagination');

let totalResults;
let input;
let userParams = {
  primary_release_year: '',
  year: '',
  query: '',
  page: 1,
}
let resultsArr; 
  
searchForm.addEventListener('submit', onSubmitForm);

async function fetchFilms() {
  let url = `${BASIC_URL}${trending_week}?api_key2=${API_KEY}`;
  if (userParams.query) {
    url = `${BASIC_URL}${search_films}?api_key=${API_KEY}&query=${userParams.query}&page=${userParams.page}`;
  }
  const response = await fetch(url);
  const moviesData = await response.json();
  return moviesData;
}

async function createDefaultMarkup(pictures) {
  let markupLibrary ='';
  for (const elem of pictures) {
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
return gallery.innerHTML = markupLibrary;
};

function onSubmitForm(e) {
  e.preventDefault();

  const dataText = searchForm.elements.searchQuery.value;
  input = dataText;

  e.target.reset();
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
  

  userParams.query = input;
  userParams.page = 1;
  appendMarkup();
}

async function updatePagination() {
  try {
    const updatedOptions = {
      ...options,
      totalItems: totalResults,
    };
console.log(updatedOptions.totalItems);
   let paginationInstance = new Pagination(pagContainer, updatedOptions);

    paginationInstance.on('afterMove', e => {
      const currentPage = e.page;
      userParams.page = currentPage;
      loadMoviesForPage(currentPage);
      updatePaginationMarkup(currentPage);
    });

    updatePaginationMarkup(currentPage);

  } catch (error) {
    console.log(error);
  }
}

function updatePaginationMarkup(currentPage) {
  const paginationButtons = document.querySelectorAll('.tui-page-btn');
  paginationButtons.forEach(button => {
    if (button.textContent == currentPage) {
      button.classList.add('tui-is-selected');
    } else {
      button.classList.remove('tui-is-selected'); 
    }
  });
}

let currentPage = 1;
let movies = [];

async function loadMoviesForPage(page) {
  const startIndex = (page - 1) * itemsPerPage;
  try {
    userParams.page = page;
    const response = await fetch(`${BASIC_URL}${new_films}?api_key=${API_KEY}&query=${userParams.query}&include_adult=false&primary_release_year=${userParams.primary_release_year}&page=${page}&region=&year=${userParams.year}`);
    const moviesData = await response.json();
    movies = moviesData.results;

    const markupCreate = createDefaultMarkup(movies);

    totalResults = moviesData.total_results;
    updatePaginationMarkup(currentPage);

  } catch (error) {
    console.log(error);
  }
}


const pagContainer = document.getElementById('pagination');
const totalMovie = totalResults;
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

let paginationInstance = new Pagination(pagContainer, options);

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

    const markupCreate = createDefaultMarkup(movies.results);

    if (!userParams.query) {
      loadMoviesForPage(currentPage);
    }

    updatePagination();

  } catch (error) {
    console.log(error);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  loadTrendingMovies();
});

async function loadTrendingMovies() {
  try {
    const response = await fetch(`${BASIC_URL}${trending_week}?api_key=${API_KEY}`);
    const moviesData = await response.json();
    movies = moviesData.results;

    const markupCreate = createDefaultMarkup(movies);

    totalResults = moviesData.total_results;
    updatePagination();

  } catch (error) {
   const oopsMarkup = `<p class="oops-text">OOPS...<br>
     We are very sorry!<br>
     Something went wrong!</p>`
         gallery.innerHTML = oopsMarkup;
    paginationDiv.classList.add("visually-hidden");
    return; 
  }
}
  





