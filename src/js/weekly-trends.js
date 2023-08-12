import { refs,LIBRARY_KEY } from './helpers';

const { BASIC_URL, API_KEY, trending_week, new_films,movie_detailes } = refs;
const IMG_URL = 'https://image.tmdb.org/t/p/original/';

const refsMonth = {
  wrapper: document.querySelector('.month-wrapper'),
  addToLibraryBtn: document.querySelector('button[data-action="save"]'),
  container: document.querySelector('.container-img-weekly'),
  removeLibraryBtn:document.querySelector('.remove-from-library'),
  cardModal: document.querySelector('.container-img-list'),
};

refsMonth.addToLibraryBtn.addEventListener('click', onOpenLibraryBtn);
window.addEventListener('resize', onResizeDisplay);
refsMonth.removeLibraryBtn.addEventListener('click',onRemoveFromLibrary);

let filmInStorage = JSON.parse(localStorage.getItem(LIBRARY_KEY)) || [];

let toStorage;

async function fetchTrendingMonthMovies() {
  const url = `${BASIC_URL}${new_films}?api_key=${API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();

  if (data.results.length === 0) {
    const errorMarkup = `<p class="error-text">OOPS...<br>
     We are very sorry!<br>
     We can't find a movie for you to watch.</p>`;
    refsMonth.wrapper.insertAdjacentHTML('afterbegin', errorMarkup);
    return [];
  }

  const randomIndex = Math.floor(Math.random() * data.results.length);
  toStorage = data.results[randomIndex];
  return [toStorage];
}

function onOpenLibraryBtn() {
  const movieId = toStorage.id;

  const filmInStorage = JSON.parse(localStorage.getItem(LIBRARY_KEY)) || [];
  const existingMovieIndex = filmInStorage.findIndex(el => el.id === movieId);

  if (existingMovieIndex) {
    filmInStorage.push(toStorage);
    localStorage.setItem(LIBRARY_KEY, JSON.stringify(filmInStorage));
    refsMonth.addToLibraryBtn.classList.add('visually-hidden');
    refsMonth.removeLibraryBtn.classList.remove('visually-hidden');
  } else {
    filmInStorage.splice(existingMovieIndex, 1);
    localStorage.setItem(LIBRARY_KEY, JSON.stringify(filmInStorage));
    refsMonth.addToLibraryBtn.classList.remove('visually-hidden');
    refsMonth.removeLibraryBtn.classList.add('visually-hidden');
  }
}

function onRemoveFromLibrary(evt) {
  const movieIdToRemove = evt.currentTarget.dataset.action;

  const filmInStorage = JSON.parse(localStorage.getItem(LIBRARY_KEY)) || [];


  const movieIndexToRemove = filmInStorage.findIndex(elem => elem.id === Number(movieIdToRemove));

  if (movieIndexToRemove) {
    filmInStorage.splice(movieIndexToRemove, 1);
    localStorage.setItem(LIBRARY_KEY, JSON.stringify(filmInStorage));
    updateLibraryButton(movieIdToRemove);
  }
}

function onResizeDisplay() {
  if (window.innerWidth === 768) {
    renderAndAppendMarkup();
  }
}

export async function getGenres(movieId){
  const urlGenres = `${BASIC_URL}${movie_detailes}${movieId}?api_key=${API_KEY}`
  const response = await fetch(urlGenres);
  const datas = await response.json();
  const genres = datas.genres.slice(0,2).map(({name}) => name).join(', ')
return genres;
}

let shownMovieIds = []; 

async function fetchTrendingMovies() {
  const url = `${BASIC_URL}${trending_week}?api_key=${API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();

  let numberOfImages = 3;

  if (window.innerWidth >= 320 && window.innerWidth < 768) {
    numberOfImages = 1;
  } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
    numberOfImages = 3;
  }

  const arrayFilms = [];
  for (let i = 0; i < numberOfImages; i += 1) {
    let randomIndex;
    
    do {
      randomIndex = Math.floor(Math.random() * data.results.length);
    } while (shownMovieIds.includes(data.results[randomIndex].id));

    shownMovieIds.push(data.results[randomIndex].id);
    arrayFilms.push(data.results[randomIndex]);
  }
  return arrayFilms;
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
        release_date,
        overview,
        vote_average,
      } = elem;
const movieWeekGenre = await getGenres(id);


markupWeekly += `<li data-id="${id}" class="container-img-list open-modal">
<div class="gradient-wrap-img"></div>
<img src="${IMG_URL}${poster_path}" alt="${overview}" loading="lazy" class="img-weekly">
<div class="img-wrapper">
<h3 class="title-cinema">${title}</h3>
<p class="genre-year-text">${movieWeekGenre} | ${release_date.slice(0, 4)}</p>
<div class="rating">
    <div class="rating-body">
      <div class="rating-active" style="width:${vote_average * 10}%"></div>
    </div>
  </div>
</div> 
</li>`
  }
refsMonth.container.insertAdjacentHTML('beforeend', markupWeekly);
}

async function renderMonthMarkup() {
  try {
    const monthMovies = await fetchTrendingMonthMovies();
    renderTrendingMonthMarkup(monthMovies);
    updateLibraryButton(monthMovies);
  } catch (error) {
    console.log('Error fetching or rendering movies:', error);
  }
}
renderMonthMarkup();

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
      </div>`;
      updateLibraryButton(movie);
}
refsMonth.wrapper.insertAdjacentHTML('beforeend', markup);
}

function updateLibraryButton(movie) {
  const movieId = typeof movie === 'number' ? movie : movie.id;
  const filmInStorage = JSON.parse(localStorage.getItem(LIBRARY_KEY)) || [];

  const existingMovieIndex = filmInStorage.findIndex(el => el.id === movieId);

  if (existingMovieIndex === -1) {
    refsMonth.addToLibraryBtn.classList.remove('visually-hidden');
    refsMonth.removeLibraryBtn.classList.add('visually-hidden');
  } else {
    refsMonth.addToLibraryBtn.classList.add('visually-hidden');
    refsMonth.removeLibraryBtn.classList.remove('visually-hidden');
  }
}