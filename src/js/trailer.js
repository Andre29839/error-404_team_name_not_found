import { refs } from './helpers'

const trailerRefs = {
  backDropRef: document.querySelector('.trailer-backdrop'), 
  trailerRef: document.querySelector('.trailer-container'),
  ooopsDropRef: document.querySelector('.ooops-modal-backdrop'),
  ooopsRef: document.querySelector('.oops-container'),
  closeOoopsButton: document.querySelector('.close-button-oops')
};

const { BASIC_URL, API_KEY } = refs

async function getFilmTrailer(someId) {

  const url = `${BASIC_URL}/movie/${someId}/videos?api_key=${API_KEY}&language=en-US`;
  
  try {
     const result = await fetc(url);

    if (!result.ok) {
      throw new Error(`Request failed with status: ${result.status}`);
    }

    const data = await result.json();
    return data.results[0]?.key || null; 
  } catch (error) {
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
    openModal();
  }
}

function openModal() {
   document.body.classList.add('is-scroll-block');
  trailerRefs.ooopsDropRef.classList.remove('visually-hidden');
  trailerRefs.closeOoopsButton.addEventListener('click', closeModal);
  trailerRefs.ooopsDropRef.addEventListener('click', listenBackdropModal);
  document.body.addEventListener('keydown', listenKeyDawnModal);
}

function closeModal() {
  document.body.classList.remove('is-scroll-block');
  trailerRefs.ooopsDropRef.classList.add('visually-hidden');
  trailerRefs.closeOoopsButton.removeEventListener('click', closeModal);
  trailerRefs.trailerRef.innerHTML = '';
  document.body.removeEventListener('keydown', listenKeyDawnModal);
  trailerRefs.ooopsDropRef.removeEventListener('click', listenBackdropModal);
}

function listenBackdropModal(evt) {
  if (evt.target.classList.contains('ooops-modal-backdrop')) {
    closeModal();
  }
}

function listenKeyDawnModal(evt) {
  if (evt.key === 'Escape') {
    closeModal();
  }
}


function onWatchTrailer(evt) {
  if (evt.target.classList.contains('hero-btn-trailer')) {
    const dataId = evt.target.dataset.id;
    getTrailerByFilmId(dataId);
  }
}

export { renderTrailer, getTrailerByFilmId, onWatchTrailer };
