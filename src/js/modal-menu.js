import { LIBRARY_KEY, refs } from './helpers';

let addButtonLibrary;
const generalDiv = document.querySelector('.modal-container')
let filmData;
const overflow = document.querySelector('.overflow')

export const modalWindow = document.addEventListener('DOMContentLoaded', async () => {
  const modalContainer = document.querySelector('.modal-container');

  function onEscClose(event) {
    if (event.code !== 'Escape') {
      return;
    }
    modal.close();
    document.body.classList.remove('is-scroll-block')
    overflow.classList.remove('visually-hidden')
  }

  const modal = {
    onShow: () => {
      document.addEventListener('keydown', onEscClose);
      document.body.classList.add('is-scroll-block')
      overflow.classList.remove('visually-hidden')
    },
    onClose: () => {
      document.removeEventListener('keydown', onEscClose);
      modalContainer.classList.add('visually-hidden');
      document.body.classList.remove('is-scroll-block')
    },
    close: () => {
      modal.onClose();
      document.body.classList.remove('is-scroll-block')
      overflow.classList.remove('visually-hidden')
    },
  };
  
  modalContainer.addEventListener('click', event => {
    const closeButton = event.target.closest('.modal__btn-close');
    if (closeButton) {
      modal.close();
      overflow.classList.remove('visually-hidden')
    } else if (!event.target.closest('.modal__content')) {
      modal.close();  
      overflow.classList.remove('visually-hidden')
    }
  });

  document.body.addEventListener('click', event => {
    if (!event.target.closest('.modal-container') && !event.target.closest('.open-modal')) {
      generalDiv.classList.add('visually-hidden');
      overflow.classList.add('visually-hidden');
      document.body.classList.remove('is-scroll-block')
    }
  });

  document.addEventListener('click', async event => {
    const openModalButton = event.target.closest('.open-modal');
    if (openModalButton) {
      const movieId = openModalButton.dataset.movieId;
      const movieUrl = `${refs.BASIC_URL}/movie/${movieId}?api_key=${refs.API_KEY}`;         
      try {
        const response = await fetch(movieUrl).then(res => res.json());
        
        if (response) {
          filmData = response;
          
          modalContainer.classList.remove('visually-hidden'); 
          overflow.classList.remove('visually-hidden')
          modalContainer.innerHTML = modalMovieInfoMarkup(filmData);
          addButtonLibrary = document.querySelector('.btn-add-library');
          addButtonLibrary.addEventListener('click', addToLocal);
          const filmInStorage = JSON.parse(localStorage.getItem(LIBRARY_KEY)) || [];
          filmInStorage.some(elem => elem.id === Number(movieId)) ? addButtonLibrary.textContent = "Remove from my library" : addButtonLibrary.textContent = "Add to my library";
          modal.onShow();
          
        } else {
          console.error('Error fetching movie data:', response.statusText);
          
        }
      } catch (error) {
        console.error('Error fetching movie data:', error);
        
      }
      
    }
  });
    
});

export function modalMovieInfoMarkup(filmData) {
  const {
    id,
    title,
    original_title,
    vote_average,
    vote_count,
    popularity,
    overview,
    genres,
    poster_path,
  } = filmData;
  const genreList = genres.map(({ name }) => name).join(', ');

  let posterUrl = '';

  if (poster_path) {
    posterUrl = `https://image.tmdb.org/t/p/original/${poster_path}`;
  } else {
    const resolution = window.devicePixelRatio > 1 ? '@2x' : '@1x';
    if (window.innerWidth < 768) {
      posterUrl = new URL(`./images/oops_opt/oops_mob${resolution}.png`);
    }

    if (window.innerWidth >= 768 && window.innerWidth < 1280) {
      posterUrl = new URL(`./images/oops_opt/oops_tab${resolution}.png`);
    }

    if (window.innerWidth >= 1280) {
      posterUrl = new URL(`./images/oops_opt/oops_des${resolution}.png`);
    }
  }

  return `
  <button class="modal__btn-close" type="button">
    <svg width="11" height="11" class="modal__icon-moon">
      <use href="./images/icons.svg#icon-cross"></use>
    </svg> 
  </button>
  <div class="mod-con"> 
    <img class="modal__image" src="${posterUrl}" alt="${title || original_title}" />
    <div class="modal__content">
      <h2 class="modal__title">${title || original_title}</h2>
      <ul class="modal__list">
        <li class="modal__item">
          <div class="modal__desc">Vote / Votes</div>
        </li>
        <li class="modal__item">
          <div class="modal__desc">Popularity</div>
        </li>
        <li class="modal__item">
          <div class="modal__desc">Genre</div>
        </li>
      </ul>
      <ul class="modal__list_second">
         <li class="modal__item__second">
          <div class="modal__value">
            <span class="tag">${vote_average}</span>&nbsp;/&nbsp;<span class="tag tag-last">${vote_count}</span>
          </div>
        </li>
        <li class="modal__item">
          <div class="modal__value">${popularity}</div>
        </li>
        <li class="modal__item">
          <div class="modal__value">${genreList}</div>
        </li>
      </ul>
      <div class="modal__about">
        <h3 class="modal__subtitle">About</h3>
        <p class="modal__text">${overview}</p>
      </div>
      <button class="btn-add-library" type="button" data-movie-id="${id}">
        Add to my library
      </button>
    </div>
  </div>
  `;
}

function addToLocal() {
  
  if (addButtonLibrary) {
    
    const movieId = addButtonLibrary.dataset.movieId;
    const filmInStorage = JSON.parse(localStorage.getItem(LIBRARY_KEY)) || [];

    const existingMovie = filmInStorage.find(movie => movie.id === Number(movieId));

    if (!existingMovie) {
      filmInStorage.push(filmData);
      localStorage.setItem(LIBRARY_KEY, JSON.stringify(filmInStorage));

      addButtonLibrary.textContent = "Remove from my library";
    } else {
      const index = filmInStorage.findIndex(movie => movie.id === Number(movieId));
      if (index !== -1) {
        filmInStorage.splice(index, 1);
        localStorage.setItem(LIBRARY_KEY, JSON.stringify(filmInStorage));
        addButtonLibrary.textContent = "Add to my library";
      }
    }
  }
}
