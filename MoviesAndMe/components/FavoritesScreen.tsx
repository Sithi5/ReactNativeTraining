import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

// Redux
import { useAppSelector } from '../redux/Hooks';

// Api
import { getMovieDetailFromApi } from '../api/TMDBApi';

// Components
import DisplayMoviesList from './DisplayMoviesList';

// Types
import type {
    BottomTabNavigationProp,
    BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import type {
    NativeStackScreenProps,
    NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {
    CompositeScreenProps,
    CompositeNavigationProp,
} from '@react-navigation/native';
import type { RootTabParamList } from '../types/RootTabParamList';
import { FavoritesStackParamList } from '../types/FavoritesStackParamList';

import type { MovieData } from '../types/MovieData';

export type FavoritesNavigationProp = CompositeNavigationProp<
    NativeStackNavigationProp<FavoritesStackParamList, 'Favorites'>,
    BottomTabNavigationProp<RootTabParamList>
>;

type FavoritesScreenNavigationProp = CompositeScreenProps<
    NativeStackScreenProps<FavoritesStackParamList, 'Favorites'>,
    BottomTabScreenProps<RootTabParamList>
>;

export default function FavoritesScreen({
    navigation,
}: FavoritesScreenNavigationProp) {
    const favorites = useAppSelector((state) => state.favorites.list);
    const [isLoading, setLoading] = useState(false);
    const [movies_data, setMoviesData] = useState<MovieData[]>([]);

    useEffect(() => {
        async function _getMovie() {
            try {
                const tmp_movies_data: MovieData[] = [];
                for (const id of favorites) {
                    const response = await getMovieDetailFromApi(id);
                    tmp_movies_data.push(response);
                }
                setMoviesData(tmp_movies_data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        _getMovie();
    }, [favorites]);

    function _displayLoading() {
        if (isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size="large" color="grey" />
                </View>
            );
        }
    }

    return (
        <View style={styles.main_container}>
            <DisplayMoviesList
                navigation={navigation}
                movies_data={movies_data}
                page={1}
                total_page={1}
            />
            {_displayLoading()}
        </View>
    );
}

const styles = StyleSheet.create({
    main_container: { flex: 1 },
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
