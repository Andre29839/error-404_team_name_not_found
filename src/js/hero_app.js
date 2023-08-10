import { refs } from "./helpers";
import { createMarkup } from "./hero_markup";

const { BASIC_URL, API_KEY,} = refs

const refsHero = {
    heroSect: document.querySelector('.hero-section'),
    heroBtn: document.querySelector('.button-orange'),
    heroImg: document.querySelector('.hero-img')
};

// document.addEventListener('click', onWatchTrailer);

async function getTrending(page = 1) {
  const url = `${BASIC_URL}/trending/all/day?api_key=${API_KEY}&language=en-US&page=${page}`;
    const res = await fetch(url);
    const object = await res.json();
    console.log(object);
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
console.log(createMovie());
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
        console.log(data.results);
        return createRandomMovie(movieArr, movieNumber);
    } catch (error) {
        
    }
}





