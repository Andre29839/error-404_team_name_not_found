import { LIBRARY_KEY, refs } from './helpers';

let addButtonLibrary;
const generalDiv = document.querySelector('.modal-container')

export const modalWindow = document.addEventListener('DOMContentLoaded', async () => {
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
    if (!event.target.closest('.modal-container') && !event.target.closest('.open-modal')) {
      generalDiv.classList.add('visually-hidden');
    }
  });

  // const button = document.querySelector('.open-modal');

  document.addEventListener('click', async event => {
    const openModalButton = event.target.closest('.open-modal');
    console.log(openModalButton);
    
    if (openModalButton) {
      const movieId = openModalButton.dataset.movieId;
      console.log(movieId);
      const movieUrl = `${refs.BASIC_URL}/movie/${movieId}?api_key=${refs.API_KEY}`;
      console.log(movieUrl);
      try {
        const response = await fetch(movieUrl).then(res => res.json());

        if (response) {
          const filmData = response;

          modalContainer.classList.remove('visually-hidden');
          modalContainer.innerHTML = modalMovieInfoMarkup(filmData);
          addButtonLibrary = document.querySelector('.btn-add-library');
          addButtonLibrary.addEventListener('click', addToLocal);
          modal.onShow();
        } else {
          console.log(response);
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
console.log(filmData);
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
    <svg width="14" height="14" class="modal__icon-moon">
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
          <div class="modal__value">
            <span class="tag">${vote_average}</span>&nbsp;/&nbsp;<span class="tag">${vote_count}</span>
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
}

function addToLocal() {
  if (addButtonLibrary) {
    const movieId = addButtonLibrary.dataset.movieId;
    const filmInStorage = JSON.parse(localStorage.getItem(LIBRARY_KEY)) || [];

    const existingMovie = filmInStorage.find(movie => movie.id === Number(movieId));
    console.log(existingMovie);

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


// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';
// import { refs } from './helpers';

// const modalContainer = document.querySelector('.modal-container');
// const openModalButton = document.querySelector('.open-modal');
// const generalDiv = document.querySelector('.modal-container');
// let addButtonLibrary; // Добавьте объявление переменной

// console.log(openModalButton);

// function onEscClose(event) {
//   if (event.code !== 'Escape') {
//     return;
//   }

//   modal.close();
// }

// const modal = new SimpleLightbox('.open-modal', {
//   closeWithEscape: true,
//   animationSpeed: 150,
//   fadeSpeed: 150,
//   captionsData: 'alt',
//   captions: true,
//   docClose: true,
//   history: true,
// });

// modal.on('show.simplelightbox', () => {
//   document.addEventListener('keydown', onEscClose);
// });

// modal.on('close.simplelightbox', () => {
//   document.removeEventListener('keydown', onEscClose);
// });

// modal.on('closed.simplelightbox', () => {
//   generalDiv.classList.add('visually-hidden');
// });

// openModalButton.addEventListener('click', async (event) => {
//   const movieId = event.target.closest('.open-modal').dataset.movieId;
//   const movieUrl = `${refs.BASIC_URL}/movie/${movieId}?api_key=${refs.API_KEY}`;

//   try {
//     const response = await fetch(movieUrl);

//     if (response.ok) {
//       const filmData = await response.json();

//       modalContainer.innerHTML = modalMovieInfoMarkup(filmData);
//       addButtonLibrary = document.querySelector('.btn-add-library');
//       addButtonLibrary.addEventListener('click', addToLocal);
//       modal.open();
//     } else {
//       console.error('Error fetching movie data:', response.statusText);
//     }
//   } catch (error) {
//     console.error('Error fetching movie data:', error);
//   }
// });

// function modalMovieInfoMarkup({
//   id,
//   title,
//   original_title,
//   vote_average,
//   vote_count,
//   popularity,
//   overview,
//   genres,
//   poster_path,
// }) {
//   let posterUrl = poster_path
//     ? `https://image.tmdb.org/t/p/original/${poster_path}`
//     : `./images/oops_opt/oops_des${window.innerWidth >= 1280 ? '@2x' : '@1x'}.png`;

//   return `
//     <button class="modal__btn-close" type="button">
//       <svg width="14" height="14" class="modal__icon-moon">
//         <use href="./images/icons.svg#icon-cross"></use>
//       </svg> 
//     </button>
//     <div class="mod-con"> 
//       <img class ="modal__image" src="${posterUrl}" alt="${title || original_title}" />
//       <div class="modal__content">
//         <h2 class="modal__title">${title || original_title}</h2>
//         <ul class="modal__list">
//           <li class="modal__item">
//             <div class="modal__desc">Vote / Votes</div>
//             <div class="modal__value">
//               <span class="tag">${vote_average}</span>&nbsp;/&nbsp;<span class="tag">${vote_count}</span>
//             </div>
//           </li>
//           <li class="modal__item">
//             <div class="modal__desc">Popularity</div>
//             <div class="modal__value">${popularity}</div>
//           </li>
//           <li class="modal__item">
//             <div class="modal__desc">Genre</div>
//             <div class="modal__value">${genres.map(genre => genre.name).join(', ')}</div>
//           </li>
//         </ul>
//         <div class="modal__about">
//           <h3 class="modal__subtitle">About</h3>
//           <p class="modal__text">${overview}</p>
//         </div>
//         <button class="btn-add-library" type="button" data-movie-id="${id}">
//           Add to my library
//         </button>
//       </div>
//     </div>
//   `;
// }

// const LIBRARY_KEY = 'filmLibrary'; // Добавьте объявление константы LIBRARY_KEY

// function addToLocal() {
//   if (addButtonLibrary) {
//     const movieId = addButtonLibrary.dataset.movieId;
//     const filmInStorage = JSON.parse(localStorage.getItem(LIBRARY_KEY)) || [];

//     const existingMovie = filmInStorage.find(movie => movie.id === Number(movieId));
//     console.log(existingMovie);

//     if (!existingMovie) {
//       filmInStorage.push(existingMovie); // Измените на filmData
//       localStorage.setItem(LIBRARY_KEY, JSON.stringify(filmInStorage));

//       addButtonLibrary.textContent = "Remove from my library";
//     } else {
//       const index = filmInStorage.findIndex(movie => movie.id === Number(movieId));
//       if (index !== -1) {
//         filmInStorage.splice(index, 1);
//         localStorage.setItem(LIBRARY_KEY, JSON.stringify(filmInStorage));
//         addButtonLibrary.textContent = "Add to my library";
//       }
//     }
//   }
// }