import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  ActivityIndicator,
} from 'react-native';

import MovieDetailsScreen from '../components/MovieDetailsScreen';
import SearchScreen from '../components/SearchScreen';
import RootStackParamList from '../types/RootStackParamList';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigation() {
  return (
    <Stack.Navigator initialRouteName="Search">
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen
        name="MovieDetails"
        component={MovieDetailsScreen}
        options={{ title: 'Movie details' }}
      />
    </Stack.Navigator>
  );
}
