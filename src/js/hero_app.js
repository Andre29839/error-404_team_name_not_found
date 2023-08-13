import { refs } from "./helpers";
import { createMarkup } from "./hero_markup";
import { onWatchTrailer } from './trailer';



const { BASIC_URL, API_KEY } = refs

const refsHero = {
    heroSect: document.querySelector('.hero-section'),
    heroBtn: document.querySelector('.button-orange'),
    heroImg: document.querySelector('.hero-section-slide'),
};


document.addEventListener('click', onWatchTrailer);

async function getTrending(page = 1) {
  const url = `${BASIC_URL}/trending/all/day?api_key=${API_KEY}&language=en-US&page=${page}`;
    const res = await fetch(url);
    const object = await res.json();
    return object;
}
getTrending()

async function createMovie() {
try {
  const movieArr = await topDayFilm(1)
  const movieContainer = document.getElementById('hero-section')

  if (movieContainer) {
    movieContainer.classList.add('transition-fade')

    setTimeout(() => { 
      createMarkup(movieArr)
      const movieContainer = document.getElementById('hero-section')
      movieContainer.classList.remove('transition-fade')
    }, 900);
  }
} catch (error) {
  console.error(error);
}
}

createMovie();

setInterval(createMovie, 10000);

function createRandomMovie(arr, movieNumber) {
    let randomMovie = [];
    for (let i = 0; i < movieNumber; i+= 1) {
        let RandomMovieIndex = Math.floor(Math.random() * arr.length)
        randomMovie.push(arr.splice(RandomMovieIndex, 1)[0]);
    }
    return randomMovie;
}

async function topDayFilm(movieNumber) {
    try {
        const data = await getTrending();
        const movieArr = data.results;
        return createRandomMovie(movieArr, movieNumber);
    } catch (error) {
        
    }
}
