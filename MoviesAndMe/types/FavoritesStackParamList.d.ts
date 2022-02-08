import type { MovieData } from './MovieData';
import type { Id } from './Id';

export type FavoritesStackParamList = {
  Favorites: undefined;
  MovieDetails: { id: Id };
};
