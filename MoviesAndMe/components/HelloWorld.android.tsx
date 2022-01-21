import React from 'react';

import { View, StyleSheet, Text } from 'react-native';

export default function HelloWorld() {
  return (
    <View style={styles.main_container}>
      <Text>Hello android</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  main_container: {},
});
