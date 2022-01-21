import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

// Components
import MoviesItems from './MoviesItems';

// Types
import type { SearchNavigationProp } from './SearchScreen';
import { FavoritesNavigationProp } from './FavoritesScreen';
import type { MovieData } from '../types/MovieData';
import type { Id } from '../types/Id';

type Props = {
  navigation: FavoritesNavigationProp | SearchNavigationProp;
  movies_data: MovieData[];
  page: number;
  total_page: number;
  _loadMovies?: () => void;
};

export default function DisplayMoviesList(props: Props) {
  let { navigation, movies_data, page, total_page, _loadMovies } = props;

  function _navigateToMovieDetails(id: Id) {
    navigation.navigate('MovieDetails', { id: id });
  }

  return (
    <FlatList
      data={movies_data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.movie_items_container}>
          <MoviesItems
            movie={item}
            _navigateToMovieDetails={_navigateToMovieDetails}
          />
        </View>
      )}
      onEndReachedThreshold={0.5}
      onEndReached={() => {
        if (page < total_page && _loadMovies !== undefined) {
          _loadMovies();
        }
      }}
    />
  );
}

const styles = StyleSheet.create({
  movie_items_container: {
    backgroundColor: 'white',
    paddingTop: 5,
    paddingLeft: 5,
  },
});
