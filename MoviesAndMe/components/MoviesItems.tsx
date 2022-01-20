import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { getImageFromTMDBApi } from '../api/TMDBApi';

// Redux
import { useAppSelector } from '../redux/Hooks';

// Types
import type { MovieData } from '../types/MovieData';
import type { Id } from '../types/Id';

type Props = {
  movie: MovieData;
  navigateToMovieDetails: (movie_id: Id) => void;
};

export default function MoviesItems(props: Props) {
  let { movie, navigateToMovieDetails } = props;
  let image_url = getImageFromTMDBApi(movie.poster_path, 'w300');
  const favorites = useAppSelector((state) => state.favorites.list);

  function _displayFavoriteImage() {
    if (favorites.includes(movie.id)) {
      return (
        <Image
          style={styles.favorite_icon}
          source={require('../images/icon_favorite.png')}
        />
      );
    }
  }

  return (
    <TouchableOpacity
      style={styles.main_container}
      onPress={() => navigateToMovieDetails(movie.id)}
    >
      <Image source={{ uri: image_url }} style={styles.movie_image} />
      <View style={styles.content_main_container}>
        <View style={styles.content_top_container}>
          {_displayFavoriteImage()}
          <Text style={styles.title_text}>{movie.title}</Text>
          <Text style={styles.vote_text}>{movie.vote_average}</Text>
        </View>

        <View style={styles.content_middle_container}>
          <Text style={styles.overview_text} numberOfLines={6}>
            {movie.overview}
          </Text>
        </View>
        <View style={styles.content_bottom_container}>
          <Text style={styles.release_date_text}>{movie.release_date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  main_container: {
    backgroundColor: 'lightgrey',
    flexDirection: 'row',
    height: 190,
  },
  movie_image: {
    width: 120,
    height: 180,
    margin: 5,
    backgroundColor: 'grey',
  },
  content_main_container: {
    flexDirection: 'column',
    flex: 1,
    margin: 5,
  },
  content_top_container: {
    flexDirection: 'row',
    flex: 3,
  },

  content_middle_container: { flex: 7 },
  content_bottom_container: {
    flex: 1,
  },
  title_text: {
    textAlign: 'left',
    flex: 1,
    flexWrap: 'wrap',
    fontWeight: 'bold',
    fontSize: 20,
  },
  favorite_icon: {
    width: 25,
    height: 25,
  },
  vote_text: {
    textAlign: 'right',
    fontWeight: 'bold',
    color: 'grey',
    flex: 1,
    fontSize: 25,
  },
  overview_text: { fontStyle: 'italic', color: 'grey' },
  release_date_text: { textAlign: 'right' },
});
