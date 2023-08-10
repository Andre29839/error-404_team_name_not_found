import { Notify } from 'notiflix';
import { refs } from "./helpers";

const { BASIC_URL, API_KEY, } = refs

async function getMovie(movie_id) {
  const url = `${BASIC_URL}/movie/${movie_id}/videos?api_key=${API_KEY}&language=en-US`;
  try {
    const result = await fetch(url);

    if (!result.ok) {
      throw new Error(`Request failed with status: ${result.status}`);
    }

    const obj = await result.json();
    console.log(obj);
    return obj;
  } catch (error) {
    Notify.info('Error fetching movie:')
  }
}

const trailerRefs = {
  backDropRef: document.querySelector('.trailer-backdrop'),
    trailerRef: document.querySelector('.trailer-container'),
};

function onWatchTrailer(evt) {
  if (evt.target.classList.contains('hero-btn-trailer')) {
    const dataId = evt.target.dataset.id;
    getTrailerByFilmId(dataId);
  }
}

async function getTrailerByFilmId(id) {
  const movieData = await getMovie(id);
  if (movieData.results.length > 0) {
    const trailerKey = movieData.results[0].key;
    renderTrailer(trailerKey);
  } else {
    Notify.info('No trailers found for this movie.')
  }
}

function renderTrailer(movieKey) {
  document.body.classList.add('is-scroll-block');

    trailerRefs.backDropRef.classList.remove('visually-hidden');
    console.log(trailerRefs);
    trailerRefs.trailerRef.innerHTML = `<div><iframe class="trailer-iframe" src='https://www.youtube.com/embed/${movieKey}
  'frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
 </div>`;

  trailerRefs.backDropRef.addEventListener('click', listenBackdropClick);
  document.body.addEventListener('keydown', listenKeyDawn);
}

const listenBackdropClick = event => {
  if (event.target.classList.contains('trailer-backdrop')) {
    closeTrailer();
  }
};

const listenKeyDawn = event => {
  if (event.key === 'Escape') {
    closeTrailer();
  }
};

const closeTrailer = () => {
  document.body.classList.remove('is-scroll-block');
  trailerRefs.backDropRef.classList.add('visually-hidden');

  trailerRefs.trailerRef.innerHTML = '';


  document.body.removeEventListener('keydown', listenKeyDawn);
  trailerRefs.backDropRef.removeEventListener('click', listenBackdropClick);
};

export { renderTrailer, getTrailerByFilmId, onWatchTrailer };
