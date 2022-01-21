import React from 'react';
import HelloWorldIos from './HelloWorld.ios';
import HelloWorldAndroid from './HelloWorld.android';

import { View, StyleSheet, Platform } from 'react-native';

export default function TestScreen() {
  return (
    <View style={styles.main_container}>
      {Platform.OS === 'ios' ? <HelloWorldIos /> : <HelloWorldAndroid />}
    </View>
  );
}
const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
