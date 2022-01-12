const API_KEY = '2a60957cda64b52e0af05890287c9980';

async function getFilmsFromApiWithSearchedText(text: string) {
  const url =
    'https://api.themoviedb.org/3/search/movie?api_key=' +
    API_KEY +
    '&query=' +
    text;
  try {
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
}

export default getFilmsFromApiWithSearchedText;
