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
import Constants from 'expo-constants';

import MoviesItems from './MoviesItems';
import getFilmsFromTMDBApiWithSearchedText from '../api/TMDBApi';
import MovieData from './MovieData';

function Search({}) {
  console.log('render - search');
  const [isLoading, setLoading] = useState(false);
  const [movies_data, setMoviesData] = useState<any[]>([]);

  var search_title: string = '';
  var page = 0;
  var total_page = 0;

  async function _getMovies() {
    if (search_title.length > 0) {
      try {
        setLoading(true);
        let response = await getFilmsFromTMDBApiWithSearchedText(
          search_title,
          1
        );
        page = response.page;
        total_page = response.total_page;

        setMoviesData(response.result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  }

  function _displayLoading() {
    return (
      <View style={styles.loading_container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.main_container}>
      <TextInput
        style={styles.text_input}
        placeholder="Titre du film"
        onChangeText={(text) => {
          search_title = text;
        }}
        onSubmitEditing={_getMovies}
      />
      <View style={styles.button_search_view}>
        <Button color="green" title="Rechercher" onPress={_getMovies} />
      </View>
      {isLoading ? (
        _displayLoading()
      ) : (
        <FlatList
          data={movies_data}
          keyExtractor={({ id }) => id}
          renderItem={({ item }) => (
            <View style={styles.movie_items_container}>
              <MoviesItems movie={item} />
            </View>
          )}
          // onEndReachedThreshold={0.5}
          // onEndReached={_getMovies}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  main_container: { flex: 1, marginTop: Constants.statusBarHeight },
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

export default Search;
