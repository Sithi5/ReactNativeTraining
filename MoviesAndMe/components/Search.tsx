// Components/Search.js

import React from "react";
import { StyleSheet, View, TextInput, Button } from "react-native";
import Constants from "expo-constants";

function Search({}) {
  return (
    <View style={styles.main_container}>
      <TextInput style={styles.text_input} placeholder="Titre du film" />
      <View style={styles.button_search_view}>
        <Button color="green" title="Rechercher" onPress={function () {}} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main_container: { flex: 1, marginTop: Constants.statusBarHeight },
  text_input: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: "#000000",
    borderWidth: 1,
    paddingLeft: 5,
  },
  button_search_view: {
    marginLeft: 5,
    marginRight: 5,
  },
});

export default Search;
