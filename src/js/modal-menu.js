import { refs } from './helpers';

const { BASIC_URL, trending_week, API_KEY, LIBRARY_KEY } = refs;

let addButtonLibrary;
const generalDiv = document.querySelector('.modal-container')

const film = {
  adult: false,
  backdrop_path: '/c6Splshb8lb2Q9OvUfhpqXl7uP0.jpg',
  belongs_to_collection: null,
  budget: 0,
  genres: [
    { id: 28, name: 'Action' },
    { id: 53, name: 'Thriller' },
  ],
  homepage: 'https://www.openroadfilms.com/movies/kandahar',
  id: 717930,
  imdb_id: 'tt5761544',
  original_language: 'en',
  original_title: 'Kandahar',
  overview:
    'John Wick (Keanu Reeves) takes on his most lethal adversaries yet in the upcoming fourth instalment of the series. With the price on his head ever increasing, John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe and forces that turn old friends into foes. ',
  popularity: 162.109,
  poster_path: '/lCanGgsqF4xD2WA5NF8PWeT3IXd.jpg',
  release_date: '2023-05-25',
  revenue: 3000000,
  runtime: 119,
  status: 'Released',
  tagline: 'The only thing more dangerous than the mission is the escape',
  title: 'Kandahar',
  video: false,
  vote_average: 6.58,
  vote_count: 318,
};

export const moadlWind = document.addEventListener('DOMContentLoaded', () => {
  const modalContainer = document.querySelector('.modal-container');

  

  function onEscClose(event) {
    if (event.code !== 'Escape') {
      return;
    }

    modal.close();
  }

  const modal = {
    onShow: () => {
      document.addEventListener('keydown', onEscClose);
    },
    onClose: () => {
      document.removeEventListener('keydown', onEscClose);
      modalContainer.classList.add('visually-hidden');
    },
    close: () => {
      modal.onClose();
    },
  };

  modalContainer.addEventListener('click', event => {
    const closeButton = event.target.closest('.modal__btn-close');

    if (closeButton) {
      modal.close();
    } else if (!event.target.closest('.modal__content')) {
      modal.close();
    }
  });
  document.body.addEventListener('click', event => {
    if (!event.target.closest('.modal-container') && !button.contains(event.target)) {
      generalDiv.classList.add('visually-hidden')  ;
    }
  });
  const button = document.querySelector('.open-modal');

  button.addEventListener('click', () => {
    modalContainer.classList.remove('visually-hidden');
    modalContainer.innerHTML = modalMovieInfoMarkup(film);
    addButtonLibrary = document.querySelector('.btn-add-library')
    addButtonLibrary.addEventListener('click', dermo)
    modal.onShow();
  });
});

export const modalMovieInfoMarkup = movie => {
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
  } = movie;

  // const genreList = genres.map(({ name }) => name).join(', ');
  const genreList = Array.isArray(genres) ? genres.map(({ name }) => name).join(', ') : '';
  let posterUrl = '';

  // if (poster_path) {
  //   posterUrl = `https://image.tmdb.org/t/p/original/${poster_path}`;
  // } else {
  //   const resolution = window.devicePixelRatio > 1 ? '@2x' : '@1x';

  //   if (window.innerWidth < 768) {
  //     posterUrl = new URL(`../images/oops_opt/oops_mob${resolution}.png`);
  //   }

  //   if (window.innerWidth >= 768 && window.innerWidth < 1280) {
  //     posterUrl = new URL(`../images/oops_opt/oops_tab${resolution}.png`);
  //   }

  //   if (window.innerWidth >= 1280) {
  //     posterUrl = new URL(`../images/oops_opt/oops_des${resolution}.png`);
  //   }
  // }
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
            <svg width="14" height="14" class="modal__icon-moon">
              <use href="./images/icons.svg#icon-cross"></use>
            </svg> 
          </button>
      <div class="mod-con"> 
            
        <img class ="modal__image" src="${posterUrl}" alt="${
    title || original_title
  }" />
  
        <div class="modal__content">
          <h2 class="modal__title">${title || original_title}</h2>
          
          <ul class="modal__list">
            <li class="modal__item">
              <div class="modal__desc">Vote / Votes</div>
              <div class="modal__value">
                <span class="tag">
                  ${vote_average}
                </span>
                &nbsp;/&nbsp;
                <span class="tag">
                  ${vote_count}
                </span>
              </div>
            </li>
            <li class="modal__item">
              <div class="modal__desc">Popularity</div>
              <div class="modal__value">${popularity}</div>
            </li>
            <li class="modal__item">
              <div class="modal__desc">Genre</div>
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
};

console.log(addButtonLibrary);

function dermo () {

  if (addButtonLibrary) {
    const movieId = addButtonLibrary.dataset.movieId;
    const filmInStorage = JSON.parse(localStorage.getItem(LIBRARY_KEY)) || [];
    

    const existingMovie = filmInStorage.find(movie => movie.id === movieId);
    if (!existingMovie) {
      filmInStorage.push(film);
      localStorage.setItem(LIBRARY_KEY, JSON.stringify(filmInStorage));
      
      addButtonLibrary.textContent = "Remove from my library";
    }
  } else {
    let filmInStorage = JSON.parse(localStorage.getItem(LIBRARY_KEY)) || [];
  
    const index = filmInStorage.findIndex(movie => movie.id === movieId);
    
    if (index !== -1) {
      filmInStorage.splice(index, 1); 
      localStorage.setItem(LIBRARY_KEY, JSON.stringify(filmInStorage));
    }
  }

};


