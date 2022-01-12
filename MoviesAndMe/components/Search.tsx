import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  FlatList,
  Text,
} from 'react-native';
import Constants from 'expo-constants';

import MoviesItems from './MoviesItems';
import getFilmsFromApiWithSearchedText from '../api/TMDBApi';

function Search({}) {
  const [isLoading, setLoading] = useState(true);
  const [movies_data, setMoviesData] = useState([]);

  var search_title: string = 'Star Wars';

  async function _getMovies() {
    try {
      console.log('');
      setLoading(true);
      const json = await getFilmsFromApiWithSearchedText(search_title);
      setMoviesData(json.results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function _titleOnChangeText(text: string) {
    search_title = text;
  }

  return (
    <View style={styles.main_container}>
      <TextInput
        style={styles.text_input}
        placeholder="Titre du film"
        onChangeText={_titleOnChangeText}
      />
      <View style={styles.button_search_view}>
        <Button color="green" title="Rechercher" onPress={_getMovies} />
      </View>
      {isLoading ? (
        <Text>LOADING MOVIES</Text>
      ) : (
        <FlatList
          data={movies_data}
          keyExtractor={({ id }) => id}
          renderItem={({ item }) => (
            <View style={styles.movie_items_container}>
              <MoviesItems movie={item} />
            </View>
          )}
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
});

export default Search;
