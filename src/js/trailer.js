import { Notify } from 'notiflix';
import { refs } from './helpers'

const trailerRefs = {
  backDropRef: document.querySelector('.trailer-backdrop'), // Replace with your actual selector
  trailerRef: document.querySelector('.trailer-container') // Replace with your actual selector
};

const { BASIC_URL, API_KEY } = refs

async function getFilmTrailer(someId) {

  const url = `${BASIC_URL}/movie/${someId}/videos?api_key=${API_KEY}&language=en-US`;
  
  try {
    const result = await fetch(url);

    if (!result.ok) {
      throw new Error(`Request failed with status: ${result.status}`);
    }

    const data = await result.json();
    return data.results[0]?.key || null; // Assuming you want the first video's key
  } catch (error) {
    Notify.warning('Error fetching movie:', error);
    return null;
  }
};

function renderTrailer(movieKey) {
  document.body.classList.add('is-scroll-block');
  trailerRefs.backDropRef.classList.remove('visually-hidden');
  trailerRefs.trailerRef.innerHTML = `<div><iframe class="trailer-iframe" src='https://www.youtube.com/embed/${movieKey}' frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
  trailerRefs.backDropRef.addEventListener('click', listenBackdropClick);
  document.body.addEventListener('keydown', listenKeyDawn);
}

const listenBackdropClick = evt => {
  if (evt.target.classList.contains('trailer-backdrop')) {
    closeTrailer();
  }
};

const listenKeyDawn = evt => {
  if (evt.key === 'Escape') {
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

async function getTrailerByFilmId(id) {
  const trailerKey = await getFilmTrailer(id);

  if (trailerKey) {
    renderTrailer(trailerKey);
  } else {
    Notify.warning('No trailers found for this movie.');
  }
}

function onWatchTrailer(evt) {
  if (evt.target.classList.contains('hero-btn-trailer')) {
    const dataId = evt.target.dataset.id;
    getTrailerByFilmId(dataId);
  }
}

export { renderTrailer, getTrailerByFilmId, onWatchTrailer };