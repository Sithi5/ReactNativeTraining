import MovieData from './MovieData';
import MovieId from './MovieId';

type RootStackParamList = {
  Search: undefined;
  MovieDetails: { movie_id: MovieId };
  //   Profile: { userId: string };
};

export default RootStackParamList;
