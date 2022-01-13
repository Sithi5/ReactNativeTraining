import MovieData from './MovieData';

type RootStackParamList = {
  Search: undefined;
  MovieDetails: { movie: MovieData };
  //   Profile: { userId: string };
};

export default RootStackParamList;
