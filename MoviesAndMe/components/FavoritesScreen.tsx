import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

// Redux
import { useAppSelector } from '../redux/Hooks';

// Types
import type { Id } from '../types/Id';

type Props = {
  movie_id: Id;
};

export default function FavoritesScreen(props: Props) {
  return (
    <View>
      <Text>My Favorites</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
