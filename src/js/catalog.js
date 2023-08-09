import axios from 'axios';
import { refs } from "./helpers";

const { API_KEY, BASIC_URL, search_films, trending_week } = refs;

 const searchForm = document.querySelector('.search-form');
//  const loadMore = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');
 
let input;
let userParms = {
  query: '' 
}


searchForm.addEventListener('submit', onSubmitForm);

async function fetchFilms() { 
    const response = await fetch(`${BASIC_URL}${trending_week}?api_key=${API_KEY}`)
    const moviesData = await response.json();
    console.log(moviesData);
    return moviesData.results;
  }
// fetchFilms();

function createDefaultMarkup(pictures) {
const WEEK_IMG_URL = 'https://image.tmdb.org/t/p/original/';
const markup = pictures.map(({ title, backdrop_path, genre_ids, vote_average, overview, release_date}) => 
 `<div class="movie-card">
    <img src="${WEEK_IMG_URL}${backdrop_path}" alt="${overview}" loading="lazy" />
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
  </div>`).join('');
  return markup;
}

async function appendMarkup() {
  try{
    const movies = await fetchFilms();
    const markupCreate = createDefaultMarkup(movies);
    gallery.insertAdjacentHTML('beforeend', markupCreate);
  } catch(error) {
    console.log(error);
  }
}
appendMarkup();

// ВІДПРАВКА ФОРМИ
function onSubmitForm(e) {
  e.preventDefault();

  const dataText = searchForm.elements.searchQuery.value;
  input = dataText;
  console.log(input);
  
     e.target.reset();
  gallery.innerHTML = '';
  
  if (dataText.trim() === '') {
  return alert('Blyat')
  }
  userParms.query = input;
  getFilmsOnSearch();
}

async function getFilmsOnSearch() {
  const params = new URLSearchParams({
    api_key: API_KEY,
    query: userParms.query,
    include_adult: false,
    primary_release_year: '',
    page: 1,
    region: '',
    year: '',
  })
  try {
    const response = await fetch(`${BASIC_URL}${search_films}?${params}`);
    const searchData = await response.json();
    const searchResults = searchData.results;

    const markupSearchResults = createDefaultMarkup(searchResults);
    gallery.insertAdjacentHTML('beforeend', markupSearchResults)
  } catch (error) {
    console.log(error);
  }
}
getFilmsOnSearch()

