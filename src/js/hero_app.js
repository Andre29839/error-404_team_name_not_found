import { refs } from "./helpers";
import { createMarkup} from "./hero_markup";
import { onWatchTrailer } from './trailer';
import { modalMovieInfoMarkup } from './modal-menu'



const { BASIC_URL, API_KEY } = refs

const refsHero = {
    heroSect: document.querySelector('.hero-section'),
    heroBtn: document.querySelector('.button-orange'),
    heroImg: document.querySelector('.hero-img'),
  moreDetails: document.querySelector('.hero-btn-more')
};


document.addEventListener('click', onWatchTrailer);
document.addEventListener('click', modalMovieInfoMarkup);


async function getTrending(page = 1) {
  const url = `${BASIC_URL}/trending/all/day?api_key=${API_KEY}&language=en-US&page=${page}`;
    const res = await fetch(url);
    const object = await res.json();
    return object;
}
getTrending()

async function heroLiber() {
    if (window.location.href.includes('../partials/my-library.html')) {
        refsHero.heroBtn.style.display = none;
        refsHero.heroImg.classList.remove('hero-img')
        refsHero.heroImg.classList.add('background-library');
        return;
    }
}
heroLiber();

async function createMovie() {
try {
  const movieArr = await topDayFilm(1)
  const movieContainer = document.getElementById('hero-section')

  if (movieContainer) {
    movieContainer.classList.add('transition-fade')

    setTimeout(() => {
      movieContainer.classList.remove('transition-fade')
      createMarkup(movieArr)
    }, 0);
  }
} catch (error) {
  console.error(error);
}
}

createMovie();

setInterval(createMovie, 6000);

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



//*--------------------------             Визвати модальне вікно на деталі       ----------------------------------------------------*//

// async function createMovie() {
//     try {
//         const movieArr = await topDayFilm(1);
//         createMarkup(movieArr);
//     } catch (error) {
//         console.error("An error occurred:", error);
//     }
// }

// function startInterval() {
//     createMovie();
//     setInterval(createMovie, 5000);
// }

// startInterval();