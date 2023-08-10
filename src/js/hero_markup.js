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
<div class="rating">
  <div class="rating-body">
    <div class="rating-active"></div>
    <div class="rating-items">
      <input type="radio" class="rating-item" value="1" name="rating">
            <input type="radio" class="rating-item" value="2" name="rating">
                  <input type="radio" class="rating-item" value="3" name="rating">
                        <input type="radio" class="rating-item" value="4" name="rating">
                              <input type="radio" class="rating-item" value="5" name="rating">
    </div>
  </div>
<div class="rating-value">${vote_average / 2}</div>
</div>
    <p class="hero-descr">${overview}</p>
  </div>
  <div class="hero-btn-wrap" data-id="${id}">
  <div class="trailer-container">
  <div class="trailer-backdrop">
  <button type="button" class="hero-btn hero-btn-trailer" id="hero-btn-trailer" data-id="${id}">
    Watch trailer
  </button>
  </div>
  </div>
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

  const container = document.getElementById('hero-section'); 
  container.insertAdjacentHTML('afterend', markup);
  container.remove();
}

export { createMarkup };
