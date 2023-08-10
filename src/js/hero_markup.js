function createSlideMarkup(
  backdrop_path,
  title,
  overview,
  vote_average,
  id,
  name
) {
  return `
  <section class="hero-section-slide" id="hero-section" style="background: linear-gradient(
          86.77deg,
          var(--total-black) 30.38%,
          rgba(17, 17, 17, 0) 65.61%
        ),
        var(--total-black) url('https://image.tmdb.org/t/p/original${backdrop_path}') no-repeat center / cover;">
   <div class="hero-img-slide">
    <h1 class="hero-title-slide">${title || name}</h1>
  </div>
  <div class="stars" aria-label="Rating of this product is ${(vote_average).toFixed(1)}">
  </div>
    <p class="hero-descr">${overview}</p>
  </div>
  <div class="hero-btn-wrap" data-id="${id}">
    <button type="button" class="hero-btn-trailer" data-id="${id}">
      Watch trailer
    </button>
    <button type="button" class="hero-btn-more" data-modal-open data-id="${id}">
      More details
    </button>
 </div>
 </div>
</section>`;
  
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
  container.insertAdjacentHTML('afterend', markup);
  container.remove();
}

export { createMarkup };
