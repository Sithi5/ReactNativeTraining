import type MovieData from './MovieData';
import type Id from './Id';

export type RootStackParamList = {
  Search: undefined;
  MovieDetails: { id: Id };
  //   Profile: { userId: string };
};
