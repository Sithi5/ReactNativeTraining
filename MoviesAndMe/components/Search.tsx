import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, FlatList } from 'react-native';
import Constants from 'expo-constants';

import MoviesItems from './MoviesItems';
import MOVIES_DATA from '../utils/MoviesData';
import getFilmsFromApiWithSearchedText from '../api/TMDBApi';
import MovieData from '../utils/MovieData';

async function Search({}) {
  const [isLoading, setLoading] = useState(true);
  const [movies_data, setMoviesData] = useState([]);

  const getMovies = async () => {
    try {
      const response = await fetch('https://reactnative.dev/movies.json');
      const json = await response.json();
      setMoviesData(json.movies);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.main_container}>
      <TextInput style={styles.text_input} placeholder="Titre du film" />
      <View style={styles.button_search_view}>
        <Button color="green" title="Rechercher" onPress={getMovies} />
      </View>
      <FlatList
        data={movies_data}
        renderItem={({ item }) => (
          <View style={styles.movie_items_container}>
            <MoviesItems movie={item} />
          </View>
        )}
      ></FlatList>
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
});

export default Search;
