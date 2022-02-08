import { Image, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Component
import MovieDetailsScreen from '../components/MovieDetailsScreen';
import SearchScreen from '../components/SearchScreen';
import FavoritesScreen from '../components/FavoritesScreen';

// Type
import type { RootTabParamList } from '../types/RootTabParamList';
import type { SearchStackParamList } from '../types/SearchStackParamList';
import type { FavoritesStackParamList } from '../types/FavoritesStackParamList';
import TestScreen from '../components/TestScreen';

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

const FavoritesStack = createNativeStackNavigator<FavoritesStackParamList>();

function FavoritesStackNavigator() {
    return (
        <FavoritesStack.Navigator initialRouteName="Favorites">
            <FavoritesStack.Screen
                name="Favorites"
                component={FavoritesScreen}
            />
            <FavoritesStack.Screen
                name="MovieDetails"
                component={MovieDetailsScreen}
                options={{ title: 'Movie details' }}
            />
        </FavoritesStack.Navigator>
    );
}

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function RootTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={() => ({
                tabBarActiveTintColor: 'green',
                tabBarActiveBackgroundColor: 'lightgrey',
                tabBarInactiveBackgroundColor: 'white',
                tabBarInactiveTintColor: 'gray',
                tabBarShowLabel: false,
            })}
        >
            <Tab.Screen
                name="Test"
                component={TestScreen}
                options={{
                    title: 'Test',
                    tabBarIcon: () => {
                        const image_name = '../images/icon_testing.png';
                        return (
                            <Image
                                style={styles.tab_bar_icon}
                                source={require(image_name)}
                            ></Image>
                        );
                    },
                }}
            />

            <Tab.Screen
                name="SearchStack"
                component={SearchStackNavigator}
                options={{
                    headerShown: false,
                    title: '',
                    tabBarIcon: () => {
                        const image_name = '../images/icon_search.png';
                        return (
                            <Image
                                style={styles.tab_bar_icon}
                                source={require(image_name)}
                            ></Image>
                        );
                    },
                }}
            />
            <Tab.Screen
                name="FavoritesStack"
                component={FavoritesStackNavigator}
                options={{
                    headerShown: false,
                    title: '',
                    tabBarIcon: () => {
                        const image_name = '../images/icon_favorite.png';
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
