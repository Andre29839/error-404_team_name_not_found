import { refs,LIBRARY_KEY } from './helpers';

const { BASIC_URL, API_KEY, trending_week, new_films } = refs;
const IMG_URL = 'https://image.tmdb.org/t/p/original/';
const MOVIE_ID = 'https://api.themoviedb.org/3/movie/';

const refsMonth = {
  wrapper: document.querySelector('.month-wrapper'),
  addToLibraryBtn: document.querySelector('.add-to-library'),
  container: document.querySelector('.container-img-weekly'),
  removeLibraryBtn:document.querySelector('.remove-from-library'),
};

refsMonth.addToLibraryBtn.addEventListener('click', onOpenLibraryBtn);
window.addEventListener('resize', onResizeDisplay);
refsMonth.removeLibraryBtn.addEventListener('click',onRemoveFromLibrary)

let filmInStorage = JSON.parse(localStorage.getItem(LIBRARY_KEY)) || [];

let toStorage;

async function fetchTrendingMonthMovies() {
  const url = `${BASIC_URL}${new_films}?api_key=${API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  const randomIndex = Math.floor(Math.random() * data.results.length);
  toStorage = data.results[randomIndex];
  return [data.results[randomIndex]];
}

function onOpenLibraryBtn() {
  filmInStorage.push(toStorage);
  localStorage.setItem(LIBRARY_KEY, JSON.stringify(filmInStorage));
  refsMonth.addToLibraryBtn.classList.add('visually-hidden')
  refsMonth.removeLibraryBtn.classList.remove('visually-hidden')
}

function onRemoveFromLibrary(){
  refsMonth.addToLibraryBtn.classList.remove('visually-hidden')
  refsMonth.removeLibraryBtn.classList.add('visually-hidden');
  localStorage.removeItem(LIBRARY_KEY)
}


function onResizeDisplay() {
  if (window.innerWidth === 768) {
    renderAndAppendMarkup();
  }
}

async function getGenres(movieId){
  const urlGenres = `${MOVIE_ID}${movieId}?api_key=${API_KEY}`
  const response = await fetch(urlGenres);
  const datas = await response.json();
  const genres = datas.genres.slice(0,2).map(({name}) => name).join(', ')
return genres;
}

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

export async function getYear(data) {
  if (!data) {
    return 'There is no release date';
  }
  const year = await data.slice(0, 4);
  return year;
}

export async function renderAndAppendMarkup() {
  try {
    const movies = await fetchTrendingMovies();
    renderPageMarkup(movies);
  } catch (error) {
    console.log('Error fetching or rendering movies:', error);
  }
}
renderAndAppendMarkup();

export async function renderPageMarkup(array) {
  let markupWeekly ='';
  for (const elem of array) {
      const {
        title,
        id,
        poster_path,
        release_date:date,
        overview,
      } = elem;
const movieWeekGenre = await getGenres(id);
const movieYear = await getYear(date);

markupWeekly += `<li data-id="${id}" class="container-img-list">
<div class="gradient-wrap-img"></div>
<img src="${IMG_URL}${poster_path}" alt="${overview}" loading="lazy" class="img-weekly">
<div class="img-wrapper">
<h3 class="title-cinema">${title}</h3>
<p class="genre-year-text">${movieWeekGenre} | ${movieYear}</p> 
</div> 
</li>`
  }
refsMonth.container.insertAdjacentHTML('beforeend', markupWeekly); 
}

async function renderMonthMarkup() {
  try {
    const monthMovies = await fetchTrendingMonthMovies();
   renderTrendingMonthMarkup(monthMovies);
    // refsMonth.wrapper.insertAdjacentHTML('beforeend', monthMarkup);
  } catch (error) {
    console.log('Error fetching or rendering movies:', error);
  }
}
renderMonthMarkup();

// 

async function renderTrendingMonthMarkup(array) {
  let markup = '';
  for (const movie of array) {
    const {
      title,
      id,
      backdrop_path,
      release_date,
      vote_average,
      vote_count,
      popularity,
      overview,
    } = movie;

    const movieGenre = await getGenres(id);

    markup += `<li data-id="${id}" class="js-card-month">
      <img src="${IMG_URL}${backdrop_path}" alt="" class="month-img">
      </li>
      <div class = "wrapper-month">
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
      <p class="descr-popularity-text">${popularity.toFixed(1)}</p>
      <p class="genre-text">Genre</p>
      <p class="descr-genre-text">${movieGenre}</p>
      </div>
      </div>
      <p class="about-text">ABOUT</p>
      <p class="description-text">${overview}</p>
      </div>
      `
}
refsMonth.wrapper.insertAdjacentHTML('beforeend', markup);
} 
