import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  ActivityIndicator,
} from 'react-native';

// Types
import type { RootStackParamList } from '../types/RootStackParamList';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MovieData } from '../types/MovieData';
import type { Id } from '../types/Id';

// Components
import MoviesItems from './MoviesItems';

// Api
import getFilmsFromTMDBApiWithSearchedText from '../api/TMDBApi';

type Props = NativeStackScreenProps<RootStackParamList, 'Search'>;

var search_title: string = '';
var page = 0;
var total_page = 0;

export default function SearchScreen({ route, navigation }: Props) {
  const [isLoading, setLoading] = useState(false);
  const [movies_data, setMoviesData] = useState<MovieData[]>([]);

  async function _getMovies(clear_movie_data: boolean = false) {
    if (search_title.length > 0) {
      try {
        setLoading(true);
        let response = await getFilmsFromTMDBApiWithSearchedText(
          search_title,
          page + 1
        );
        page = response.page;
        total_page = response.total_pages;
        if (clear_movie_data) {
          setMoviesData(response.results);
        } else {
          setMoviesData(movies_data.concat(response.results));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  }

  function _searchMovies() {
    page = 0;
    total_page = 0;
    _getMovies(true);
  }

  function _displayLoading() {
    if (isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" color="grey" />
        </View>
      );
    }
  }

  function _navigateToMovieDetails(id: Id) {
    navigation.navigate('MovieDetails', { id: id });
  }

  return (
    <View style={styles.main_container}>
      <TextInput
        style={styles.text_input}
        placeholder="Titre du film"
        onChangeText={(text) => {
          search_title = text;
        }}
        onSubmitEditing={_searchMovies}
      />
      <View style={styles.button_search_view}>
        <Button color="green" title="Rechercher" onPress={_searchMovies} />
      </View>
      <FlatList
        data={movies_data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.movie_items_container}>
            <MoviesItems
              movie={item}
              navigateToMovieDetails={_navigateToMovieDetails}
            />
          </View>
        )}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (page < total_page) {
            _getMovies();
          }
        }}
      />
      {_displayLoading()}
    </View>
  );
}

const styles = StyleSheet.create({
  main_container: { flex: 1 },
  text_input: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5,
  },
  button_search_view: {
    marginLeft: 5,
    marginRight: 5,
  },
  movie_items_container: {
    backgroundColor: 'white',
    paddingTop: 5,
    paddingLeft: 5,
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
