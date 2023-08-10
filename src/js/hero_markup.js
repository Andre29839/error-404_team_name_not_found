function createSlideMarkup(
  backdrop_path,
  title,
  overview,
  vote_average,
  id,
  name
) {
  return `
<div
  style="background-image: url('https://image.tmdb.org/t/p/original${backdrop_path}');"
  class="hero-img">
    <h1 class="hero-title">${title || name}</h1>
  </div>
  <div class="stars" aria-label="Rating of this product is ${(vote_average).toFixed(1)}">
  </div>
    <p class="hero-description">${overview}</p>
  </div>
  <div class="hero-btn-wrap" data-id="${id}">
    <button type="button" class="hero-btn hero-btn-trailer" id="hero-btn-trailer" data-id="${id}">
      Watch trailer
    </button>
    <button type="button" class="hero-btn hero-btn-more is-id" id="hero-btn-more" data-modal-open data-id="${id}">
      More details
    </button>
 </div>
</div>`;
}

function createMarkup(arr) {
  const markup = arr
    .map(({ backdrop_path, title, overview, vote_average, id, name }) => {
      return createSlideMarkup(
        backdrop_path,
        title,
        overview,
        vote_average,
        id,
        name
      );
    })
    .join('');

  const container = document.getElementById('hero-section'); // Replace 'your-container-id' with the actual ID of the container element
  container.innerHTML = markup;
}

export { createMarkup };
