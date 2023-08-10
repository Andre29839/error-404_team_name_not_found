import { refs } from './helpers';

const { BASIC_URL } = refs;

const film = {adult
  : 
  false,
  backdrop_path
  : 
  "/c6Splshb8lb2Q9OvUfhpqXl7uP0.jpg",
  belongs_to_collection
  : 
  null,
  budget
  : 
  0,
  genres
  : 
  [{id: 28, name: 'Action'},
  {id: 53, name: 'Thriller'}],
  homepage
  : 
  "https://www.openroadfilms.com/movies/kandahar",
  id
  : 
  717930,
  imdb_id
  : 
  "tt5761544",
  original_language
  : 
  "en",
  original_title
  : 
  "Kandahar",
  overview
  : 
  "After his mission is exposed, an undercover CIA operative stuck deep in hostile territory in Afghanistan must fight his way out, alongside his Afghan translator, to an extraction point in Kandahar, all whilst avoiding elite enemy forces and foreign spies tasked with hunting them down.",
  popularity
  : 
  162.109,
  poster_path
  : 
  "/lCanGgsqF4xD2WA5NF8PWeT3IXd.jpg",
  release_date
  : 
  "2023-05-25",
  revenue
  : 
  3000000,
  runtime
  : 
  119,
  status
  : 
  "Released",
  tagline
  : 
  "The only thing more dangerous than the mission is the escape.",
  title
  : 
  "Kandahar",
  video
  : 
  false,
  vote_average
  : 
  6.58,
  vote_count
  : 
  318}

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

  const genreList = genres.map(({ name }) => name).join(', ');
  let posterUrl = '';

  if (poster_path) {
    posterUrl = `https://image.tmdb.org/t/p/original/${poster_path}`;
  } else {
    const resolution = window.devicePixelRatio > 1 ? '@2x' : '@1x';

    if (window.innerWidth < 768) {
      posterUrl = new URL(`../images/oops_opt/oops_mob${resolution}.png`);
    }

    if (window.innerWidth >= 768 && window.innerWidth < 1280) {
      posterUrl = new URL(`../images/oops_opt/oops_tab${resolution}.png`);
    }

    if (window.innerWidth >= 1280) {
      posterUrl = new URL(`../images/oops_opt/oops_des${resolution}.png`);
    }
  }

  return `
      <div class="modal">
        <button class="modal__btn-close" type="button">
          <i class="fa-solid fa-xmark"></i>
        </button>
        
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
  
          <button class="btn btn--secondary modal__btn" type="button" data-movie-id="${id}">
            Add to my library
          </button>
        
        </div>
      </div>
    `;
};


const button = document.querySelector('.open-modal')
button.addEventListener('click', () => {
  document.querySelector('.modal-container').classList.remove('visually-hidden');
  document.querySelector('.modal-container').innerHTML = modalMovieInfoMarkup(film)
})