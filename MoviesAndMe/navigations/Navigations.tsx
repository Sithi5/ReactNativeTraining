import { Image, StyleSheet, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MovieDetailsScreen from '../components/MovieDetailsScreen';
import SearchScreen from '../components/SearchScreen';
import type { SearchStackParamList } from '../types/SearchStackParamList';
import type { RootTabParamList } from '../types/RootTabParamList';
import FavoritesScreen from '../components/FavoritesScreen';

const SearchStack = createNativeStackNavigator<SearchStackParamList>();

function SearchStackNavigator() {
  return (
    <SearchStack.Navigator initialRouteName="Search">
      <SearchStack.Screen name="Search" component={SearchScreen} />
      <SearchStack.Screen
        name="MovieDetails"
        component={MovieDetailsScreen}
        options={{ title: 'Movie details' }}
      />
    </SearchStack.Navigator>
  );
}

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function RootTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({}) => ({
        tabBarActiveTintColor: 'green',
        tabBarActiveBackgroundColor: 'grey',
        tabBarInactiveBackgroundColor: 'white',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen
        name="SearchStack"
        component={SearchStackNavigator}
        options={{
          title: '',
          tabBarIcon: () => {
            let image_name = '../images/icon_search.png';
            return (
              <Image
                style={styles.tab_bar_icon}
                source={require(image_name)}
              ></Image>
            );
          },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          title: 'Favorites',
          tabBarIcon: () => {
            let image_name = '../images/icon_favorite.png';
            return (
              <Image
                style={styles.tab_bar_icon}
                source={require(image_name)}
              ></Image>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tab_bar_icon: {
    width: 30,
    height: 30,
  },
});
