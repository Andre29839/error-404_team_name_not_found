import Pagination from 'tui-pagination';
import { refs, getGenres } from "./helpers";

const { API_KEY, BASIC_URL, search_films, trending_week, new_films } = refs;

const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const paginationDiv = document.querySelector('.tui-pagination');
const svgReset = document.querySelector('.svg-reset');
const sectionContainer = document.querySelector('.section-container');

const pagContainer = document.getElementById('pagination');
let totalResults;
const totalMovie = totalResults;
const itemsPerPage = 20;
const visiblePage = 4;

let input;
let userParams = {
  primary_release_year: '',
  year: '',
  query: '',
  page: 1,
}
let resultsArr; 
  
searchForm.addEventListener('submit', onSubmitForm);
svgReset.addEventListener('click', onClickSvgReset);

function onClickSvgReset() {
  searchForm.reset();
 svgReset.classList.add("visually-hidden");
}


const options = {
  totalItems: totalResults,
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

async function fetchFilms() {
  let url = `${BASIC_URL}${trending_week}?api_key=${API_KEY}`;
  if (userParams.query) {
    url = `${BASIC_URL}${search_films}?api_key=${API_KEY}&query=${userParams.query}&page=${userParams.page}`;
  }
  const response = await fetch(url).then(res => res.json());
  return response;
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
  gallery.innerHTML = markupLibrary;
  
  first = document.querySelector(".tui-first");
  last = document.querySelector(".tui-last");
  first_first = document.querySelector(".tui-next")
  last_last = document.querySelector(".tui-prev")
  elipse = document.querySelector(".tui-next-is-ellip")

  first.classList.remove("tui-page-btn")
  last.classList.remove("tui-page-btn")
  first_first.classList.remove("tui-page-btn")
  last_last.classList.remove("tui-page-btn")
  elipse.classList.remove("tui-page-btn")
};


searchForm.elements.searchQuery.addEventListener("focus", function () {
  svgReset.classList.remove("visually-hidden");
})

 async function onSubmitForm(e) {
  e.preventDefault();
   isActiveFetch = true;
   typeFetch = 'searchmovies';

  const dataText = searchForm.elements.searchQuery.value;
  input = dataText;
   
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
  

  userParams.query = input;
  userParams.page = 1;
   const total = await appendMarkup();
   paginationInstance.reset(total);
   isActiveFetch = false;
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

let currentPage;
let movies = [];
let isActiveFetch = false;
let typeFetch = 'trending'; 


async function loadMoviesForPage(page) {
  try {
    userParams.page = page;
    const response = await fetch(`${BASIC_URL}${search_films}?api_key=${API_KEY}&query=${userParams.query}&page=${page}`);
    const moviesData = await response.json();
    movies = moviesData.results;
    
    if (moviesData.totalPages == userParams.page) {
  paginationDiv.classList.add("visually-hidden");
}
   createDefaultMarkup(movies);

    totalPages = moviesData.total_pages;

  } catch (error) {
    console.log(error);
  }
}


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