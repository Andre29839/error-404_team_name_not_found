import { refs } from './helpers';

const { BASIC_URL, API_KEY, trending_week, new_films } = refs;
const IMG_URL = 'https://image.tmdb.org/t/p/original/';

const LIBRARY_KEY = 'library-key';

const refsMonth = {
  wrapper: document.querySelector('.month-wrapper'),
  addToLibraryBtn: document.querySelector('.add-to-library'),
  container: document.querySelector('.container-img-weekly'),
};

refsMonth.addToLibraryBtn.addEventListener('click', onOpenLibraryBtn);
window.addEventListener('resize', onResizeDisplay);

function onResizeDisplay() {
  if ((window.innerWidth = 768)) {
    renderAndAppendMarkup();
  }
}

function onOpenLibraryBtn() {
  localStorage.setItem(LIBRARY_KEY, 'add-to-library');
}

let RESULTS_PER_PAGE = 1;

async function fetchTrendingMovies() {
  const url = `${BASIC_URL}${new_films}?api_key=${API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();

  if (window.innerWidth < 768) {
    const randomIndex = Math.floor(Math.random() * data.results.length);
    return [data.results[randomIndex]];
  }
  const arrayFilms = [];
  for (let i = 0; i < 3; i++) {
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
  const result = array.map(
    ({ title, backdrop_path, genre_ids, release_date }) =>
      `<div class="container-img-weekly">
        <img src="${IMG_URL}${backdrop_path}" alt="" class="img-weekly">
        <div class="img-wrapper">
            <h3 class="title-cinema">${title}</h3>
            <p class="genre-year-text">${genre_ids} | ${release_date}</p>
        </div>
    </div>`
  );
  return result;
}

async function fetchTrendingMonthMovies() {
  const url = `${BASIC_URL}${trending_week}?api_key=${API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  const randomIndex = Math.floor(Math.random() * data.results.length);
  return [data.results[randomIndex]];
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
  const result = array.map(
    ({
      title,
      backdrop_path,
      release_date,
      vote_average,
      vote_count,
      popularity,
      genre_ids,
      overview,
    }) => `<div class="month-wrapper">
<img src="${IMG_URL}${backdrop_path}" alt="" class="month-img">
<h2 class="month-title-movie">${title}</h2>
<div class="wrapper-month-section">
<div class="description-wrapper-left">      
<p class="release-text">Release date</p>
<p class="vote-text">Vote / Votes</p>
<p class="popularity-text">Popularity</p>
<p class="genre-text">Genre</p>
</div>
<div class="description-wrapper-right">
    <p class="descr-release-text">${release_date}</p>
    <p class="descr-vote-text"><span class="vote-numbers">${vote_average}</span> / <span class="votes-numbers">${vote_count}</span></p>
    <p class="descr-popularity-text">${popularity}</p>
    <p class="descr-genre-text">${genre_ids}</p>
</div>
</div>
<p class="about-text">ABOUT</p>
<p class="description-text">${overview}</p>
</div>`
  );
  return result;
}
