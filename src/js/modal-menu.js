import { refs } from './helpers';

const { BASIC_URL } = refs;

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
