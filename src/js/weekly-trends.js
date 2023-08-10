import { refs } from './helpers';

const { BASIC_URL, API_KEY, trending_week, new_films } = refs;
const IMG_URL = 'https://image.tmdb.org/t/p/original/';

const LIBRARY_KEY = 'favorite-film';

const refsMonth = {
  wrapper: document.querySelector('.month-wrapper'),
  addToLibraryBtn: document.querySelector('.add-to-library'),
  container: document.querySelector('.container-img-weekly'),
};

refsMonth.addToLibraryBtn.addEventListener('click', onOpenLibraryBtn);
window.addEventListener('resize', onResizeDisplay);

let filmInStorage = JSON.parse(localStorage.getItem(LIBRARY_KEY)) || [];
let toStorage;

async function fetchTrendingMonthMovies() {
  const url = `${BASIC_URL}${trending_week}?api_key=${API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  const randomIndex = Math.floor(Math.random() * data.results.length);
  toStorage = data.results[randomIndex];
  return [data.results[randomIndex]];
}

function onOpenLibraryBtn() {
  console.log(filmInStorage);
  filmInStorage.push(toStorage);
  localStorage.setItem(LIBRARY_KEY, JSON.stringify(filmInStorage));
}

function onResizeDisplay() {
  if (window.innerWidth === 768) {
    renderAndAppendMarkup();
  }
}

let RESULTS_PER_PAGE = 1;

async function fetchTrendingMovies() {
  const url = `${BASIC_URL}${trending_week}?api_key=${API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();

  if (window.innerWidth < 768) {
    const randomIndex = Math.floor(Math.random() * data.results.length);
    return [data.results[randomIndex]];
  }
  const arrayFilms = [];
  for (let i = 0; i < 3; i += 1) {
    const randomIndex = Math.floor(Math.random() * data.results.length);
    arrayFilms.push(data.results[randomIndex]);
  }
  return arrayFilms;
}

async function renderAndAppendMarkup() {
  try {
    const movies = await fetchTrendingMovies();
    const markup = renderPageMarkup(movies);
    refsMonth.container.insertAdjacentHTML('beforeend', markup);
  } catch (error) {
    console.log('Error fetching or rendering movies:', error);
  }
}
renderAndAppendMarkup();

function renderPageMarkup(array) {
  const result = array
    .map(
      ({ title, id, backdrop_path, genre_ids, release_date }) =>
        `<div data-id="${id}" class="container-img-weekly">
        <img src="${IMG_URL}${backdrop_path}" alt="" class="img-weekly">
        <div class="img-wrapper">
            <h3 class="title-cinema">${title}</h3>
            <p class="genre-year-text">${genre_ids} | ${release_date}</p>
        </div>
    </div>`
    )
    .join('');
  return result;
}

async function renderMonthMarkup() {
  try {
    const monthMovies = await fetchTrendingMonthMovies();
    const monthMarkup = renderTrendingMonthMarkup(monthMovies);
    refsMonth.wrapper.insertAdjacentHTML('beforeend', monthMarkup);
  } catch (error) {
    console.log('Error fetching or rendering movies:', error);
  }
}
renderMonthMarkup();

function renderTrendingMonthMarkup(array) {
  const markupMonth = array
    .map(
      ({
        title,
        id,
        backdrop_path,
        release_date,
        vote_average,
        vote_count,
        popularity,
        genre_ids,
        overview,
      }) => `<div data-id="${id}" class="js-card-month">
<img src="${IMG_URL}${backdrop_path}" alt="" class="month-img">
<h4 class="month-title-movie">${title}</h4>
<div class="wrapper-month-section">
<div class="description-wrapper-left">      
<p class="release-text">Release date</p>
<p class="descr-release-text">${release_date}</p>
<p class="vote-text">Vote / Votes</p>
<p class="descr-vote-text"><span class="vote-numbers">${vote_average}</span> / <span class="votes-numbers">${vote_count}</span></p>
</div>
<div class="description-wrapper-right">
<p class="popularity-text">Popularity</p>
<p class="descr-popularity-text">${popularity}</p>
<p class="genre-text">Genre</p>
<p class="descr-genre-text">${genre_ids}</p>
</div>
</div>
<p class="about-text">ABOUT</p>
<p class="description-text">${overview}</p>
</div>
`
    )
    .join('');
  return markupMonth;
}
