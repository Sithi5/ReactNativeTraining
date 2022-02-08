import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Button,
    ActivityIndicator,
} from 'react-native';

// Types
import type {
    CompositeScreenProps,
    CompositeNavigationProp,
} from '@react-navigation/native';
import type {
    NativeStackScreenProps,
    NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import type {
    BottomTabScreenProps,
    BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';
import type { SearchStackParamList } from '../types/SearchStackParamList';
import type { RootTabParamList } from '../types/RootTabParamList';

import type { MovieData } from '../types/MovieData';

// Components
import DisplayMoviesList from './DisplayMoviesList';

// Api
import getFilmsFromTMDBApiWithSearchedText from '../api/TMDBApi';

export type SearchNavigationProp = CompositeNavigationProp<
    NativeStackNavigationProp<SearchStackParamList, 'Search'>,
    BottomTabNavigationProp<RootTabParamList>
>;

type SearchScreenNavigationProp = CompositeScreenProps<
    NativeStackScreenProps<SearchStackParamList, 'Search'>,
    BottomTabScreenProps<RootTabParamList>
>;

let search_title = '';
let page = 0;
let total_page = 0;

export default function SearchScreen({
    navigation,
}: SearchScreenNavigationProp) {
    const [isLoading, setLoading] = useState(false);
    const [movies_data, setMoviesData] = useState<MovieData[]>([]);

    async function _loadMovies(clear_movie_data = false) {
        if (search_title.length > 0) {
            try {
                setLoading(true);
                const response = await getFilmsFromTMDBApiWithSearchedText(
                    search_title,
                    page + 1
                );
                page = response.page;
                total_page = response.total_pages;
                if (clear_movie_data) {
                    setMoviesData(response.results);
                } else {
                    setMoviesData(movies_data.concat(response.results));
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
    }

    function _newMoviesSearch() {
        page = 0;
        total_page = 0;
        _loadMovies(true);
    }

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
            <TextInput
                style={styles.text_input}
                placeholder="Titre du film"
                onChangeText={(text) => {
                    search_title = text;
                }}
                onSubmitEditing={_newMoviesSearch}
            />
            <View style={styles.button_search_view}>
                <Button
                    color="green"
                    title="Rechercher"
                    onPress={_newMoviesSearch}
                />
            </View>
            <DisplayMoviesList
                navigation={navigation}
                movies_data={movies_data}
                page={page}
                total_page={total_page}
                _loadMovies={_loadMovies}
            />
            {_displayLoading()}
        </View>
    );
}

const styles = StyleSheet.create({
    main_container: { flex: 1 },
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
