import type { Genre } from './Genre';
import type { Id } from './Id';
import type { ProductionCompany } from './ProductionCompany';

export type MovieData = {
  id: Id;
  title: string;
  poster_path?: string;
  vote_average?: number;
  vote_count?: number;
  vote_count?: number;
  budget?: number;
  production_companies?: ProductionCompany[];
  genres?: Genre[];
  overview?: string;
  release_date?: string;
};
