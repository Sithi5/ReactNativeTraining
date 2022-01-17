import MovieId from './MovieId';

type MovieData = {
  movie_id: MovieId;
  title: string;
  poster_path?: string;
  vote_average?: number;
  overview?: string;
  release_date?: string;
};

export default MovieData;
