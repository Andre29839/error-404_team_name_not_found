import { refs } from "./helpers";
import { createMarkup } from "./hero_markup";
import { onWatchTrailer } from './trailer';


const { BASIC_URL, API_KEY} = refs

const refsHero = {
    heroSect: document.querySelector('.hero-section'),
    heroBtn: document.querySelector('.button-orange'),
    heroImg: document.querySelector('.hero-img'),
 backDropRef: document.querySelector('.hero-trailer-backdrop'),
  trailerRef: document.querySelector('.trailer-container'),
  trailerBtn: document.querySelector('.modal-trailer-btn'),
};

window.addEventListener('click', onWatchTrailer);

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
    const movieArr = await topDayFilm(1);
    createMarkup(movieArr);
}

createMovie();

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

const ratings = document.querySelectorAll('.rating');


document.addEventListener('DOMContentLoaded', function() {


  ratings.forEach(function (rating) {

const ratingActive = rating.querySelector('.rating-active');


        const ratingValue = rating.querySelector('.rating-value');


        const ratingNumber = parseInt(ratingValue.innerHTML);

        

ratingActive.style.width = `${ratingNumber * 10}%`;

        for (let i = 0; i < ratingNumber; i++) {
          ratingActive.children[i].classList.add('active');
        }

    
    });
});
