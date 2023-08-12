export const refs = {
    API_KEY: "c3755e1c88b3f430b9a9356edda9caa4",
    BASIC_URL: "https://api.themoviedb.org/3",
    trending_day: "/trending/movie/day",
    trending_week:"/trending/movie/week",
    new_films: "/movie/upcoming",
    search_films: "/search/movie",
    movie_detailes: "/movie/",
    trailer: "/movie/id/videos",
    genger: "/genre/movie/list",
}

export const LIBRARY_KEY = 'favorite-film';

export async function getGenres(movieId){
    const urlGenres = `${refs.BASIC_URL}${refs.movie_detailes}${movieId}?api_key=${refs.API_KEY}`
    const response = await fetch(urlGenres);
    const datas = await response.json();
    const genres = datas.genres.slice(0,2).map(({name}) => name).join(', ')
  return genres;
  }

  export async function getYear(data) {
    if (!data) {
      return 'There is no release date';
    }
    const year = await data.slice(0, 4);
    return year;
  }