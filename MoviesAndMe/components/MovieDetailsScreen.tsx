import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// Redux
import { useAppSelector, useAppDispatch } from '../redux/Hooks';

import { updateFavorites } from '../redux/FavoritesSlice';

import type { SearchStackParamList } from '../types/SearchStackParamList';
import type { Id } from '../types/Id';
import type { MovieData } from '../types/MovieData';

// Api
import { getImageFromTMDBApi, getMovieDetailFromApi } from '../api/TMDBApi';

type Props = NativeStackScreenProps<SearchStackParamList, 'MovieDetails'>;

export default function MovieDetailsScreen({ route, navigation }: Props) {
  const favorites = useAppSelector((state) => state.favorites.list);
  const dispatch = useAppDispatch();

  const id: Id = route.params.id;

  const [isLoading, setLoading] = useState(true);
  const [movie, setMovie] = useState<MovieData>();

  useEffect(() => {
    async function _getMovie() {
      try {
        let response = await getMovieDetailFromApi(id);
        setMovie(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    _getMovie();
  }, [id]);

  function _displayLoading() {
    if (isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" color="grey" />
        </View>
      );
    }
  }

  function _displayDate() {
    if (movie && movie.release_date != undefined) {
      let date = new Date(movie.release_date);
      return date.toLocaleDateString();
    }
  }

  function _displayBudget() {
    if (movie && movie.budget) {
      return new Intl.NumberFormat('en-EN', {
        style: 'currency',
        currency: 'USD',
      }).format(Number(movie.budget));
    }
  }

  function _displayProductionCompanies() {
    if (movie && movie.production_companies) {
      return movie.production_companies
        .map((production_company) => {
          return production_company.name;
        })
        .join('/');
    }
  }

  function _displayGenres() {
    if (movie && movie.genres) {
      return movie.genres
        .map((genre) => {
          return genre.name;
        })
        .join('/');
    }
  }

  function _displayFavoriteImage() {
    if (favorites.includes(id)) {
      return (
        <Image
          style={styles.favorite_icon}
          source={require('../images/icon_favorite.png')}
        />
      );
    }
    return (
      <Image
        style={styles.favorite_icon}
        source={require('../images/icon_favorite_border.png')}
      />
    );
  }

  function _displayMovie() {
    if (movie != undefined) {
      let image_url = getImageFromTMDBApi(movie.poster_path, 'w300');
      return (
        <ScrollView style={styles.scrollview_container}>
          <Image source={{ uri: image_url }} style={styles.movie_image} />
          <View style={styles.content_main_container}>
            <View style={styles.content_title_container}>
              <Text style={styles.title_text}>{movie.title}</Text>
              <TouchableOpacity
                onPress={() => {
                  dispatch(updateFavorites(id));
                }}
              >
                {_displayFavoriteImage()}
              </TouchableOpacity>
            </View>
            <View style={styles.content_overview_container}>
              <Text style={styles.overview_text}>{movie.overview}</Text>
            </View>
            <View style={styles.content_bottom_container}>
              <Text style={styles.bottom_text}>Released: {_displayDate()}</Text>
              <Text style={styles.bottom_text}>
                Vote: {movie.vote_average} / 10
              </Text>
              <Text style={styles.bottom_text}>
                Number of vote: {movie.vote_count}
              </Text>
              <Text style={styles.bottom_text}>Budget: {_displayBudget()}</Text>
              <Text style={styles.bottom_text}>Genres: {_displayGenres()}</Text>
              <Text style={styles.bottom_text}>
                Production companies: {_displayProductionCompanies()}
              </Text>
            </View>
          </View>
        </ScrollView>
      );
    }
  }

  return (
    <View style={styles.main_container}>
      {_displayLoading()}
      {_displayMovie()}
    </View>
  );
}

const styles = StyleSheet.create({
  scrollview_container: {
    flex: 1,
  },
  main_container: {
    flex: 1,
  },
  movie_image: {
    flex: 3,
    height: 150,
    margin: 5,
    backgroundColor: 'gray',
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content_main_container: {
    flex: 3,
    margin: 5,
  },
  content_title_container: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
  },
  content_overview_container: {
    flex: 1,
    margin: 5,
  },
  content_bottom_container: {
    flex: 1,
    margin: 5,
  },
  title_text: {
    flexWrap: 'wrap',
    fontWeight: 'bold',
    fontSize: 30,
    color: 'black',
  },
  favorite_icon: {
    width: 40,
    height: 40,
  },
  overview_text: {
    flexWrap: 'wrap',
    fontSize: 17,
    color: 'grey',
    fontStyle: 'italic',
  },
  bottom_text: {
    flexWrap: 'wrap',
    fontSize: 17,
    color: 'dimgrey',
  },
});
