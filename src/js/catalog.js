import Pagination from 'tui-pagination';
import { refs } from "./helpers";

const { API_KEY, BASIC_URL, search_films, trending_week, new_films } = refs;

const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');

let totalResults;
let input;
let userParams = {
  primary_release_year: '',
  year: '',
  query: '',
  page: 1,
}

searchForm.addEventListener('submit', onSubmitForm);

async function fetchFilms() {
  let url = `${BASIC_URL}${trending_week}?api_key=${API_KEY}`;
  if (userParams.query) {
    url = `${BASIC_URL}${search_films}?api_key=${API_KEY}&query=${userParams.query}&page=${userParams.page}`;
  }
  
  const response = await fetch(url);
  const moviesData = await response.json();
  return moviesData;
}

function createDefaultMarkup(pictures) {
  const WEEK_IMG_URL = 'https://image.tmdb.org/t/p/original/';
  const markup = pictures.map(({ title, poster_path, genre_ids, vote_average, overview, release_date }) =>
    `<li class="movie-card">
      <div class="gradient"></div>
      <img class="movie-img" src="${WEEK_IMG_URL}${poster_path}" alt="${overview}" loading="lazy" />
      <div class="info">
        <p class="movie-title">${title}</p>
        <p class="movie-description">${genre_ids} | ${release_date}</p>
        <p class="movie-rating">${vote_average}</p>
      </div>
    </li>`).join('');
  return markup;
}

function onSubmitForm(e) {
  e.preventDefault();

  const dataText = searchForm.elements.searchQuery.value;
  input = dataText;

  e.target.reset();
  gallery.innerHTML = '';

  if (dataText.trim() === '') {
    return alert('???');
  }
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

    paginationInstance = new Pagination(pagContainer, updatedOptions);

    paginationInstance.on('afterMove', e => {
      const currentPage = e.page;
      userParams.page = currentPage;
      // appendMarkup();
      loadMoviesForPage(currentPage);
      updatePaginationMarkup(currentPage); // Оновити розмітку пагінації з номером поточної сторінки
    });

    // Оновити розмітку пагінації під час ініціалізації
    updatePaginationMarkup(currentPage);

  } catch (error) {
    console.log(error);
  }
}

function updatePaginationMarkup(currentPage) {
  const paginationButtons = document.querySelectorAll('.tui-page-btn');
  paginationButtons.forEach(button => {
    if (button.textContent == currentPage) {
      button.classList.add('tui-is-selected'); // Додати клас для виділення номера поточної сторінки
    } else {
      button.classList.remove('tui-is-selected'); // Видалити клас для виділення з інших кнопок
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
    gallery.innerHTML = markupCreate;

    totalResults = moviesData.total_results;
    updatePaginationMarkup(currentPage);

  } catch (error) {
    console.log(error);
  }
}


const pagContainer = document.getElementById('pagination');
const totalMovie = 396;
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
    const markupCreate = createDefaultMarkup(movies.results);
    gallery.innerHTML = markupCreate;

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
    gallery.innerHTML = markupCreate;

    totalResults = moviesData.total_results;
    updatePagination();

  } catch (error) {
    console.log(error);
  }
}



