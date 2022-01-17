import MovieId from '../types/MovieId';

const API_KEY = '2a60957cda64b52e0af05890287c9980';
const API_BASE_URL = 'https://api.themoviedb.org/';
const API_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';

export async function getMovieDetailFromApi(movie_id: MovieId) {
  const url = API_BASE_URL + '3/movie/' + movie_id + '?api_key=' + API_KEY;
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

export function getImageFromTMDBApi(
  name: string = '',
  format: string = 'w300'
) {
  return API_IMAGE_BASE_URL + format + name;
}

export default async function getFilmsFromTMDBApiWithSearchedText(
  text: string,
  page: number
) {
  const url =
    API_BASE_URL +
    '3/search/movie?api_key=' +
    API_KEY +
    '&query=' +
    text +
    '&page=' +
    page;
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
