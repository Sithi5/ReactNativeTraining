import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

// Components
import MoviesItems from './MoviesItems';

// Types
import type { SearchNavigationProp } from './SearchScreen';
import type { FavoritesNavigationProp } from './FavoritesScreen';
import type { MovieData } from '../types/MovieData';
import type { Id } from '../types/Id';

type Navigation = SearchNavigationProp | FavoritesNavigationProp;

type Props = {
    navigation: Navigation;
    movies_data: MovieData[];
    page: number;
    total_page: number;
    _loadMovies?: () => void;
};

function isSearchNavigationProp(
    navigation: Navigation
): navigation is SearchNavigationProp {
    return (navigation as SearchNavigationProp).navigate !== undefined;
}

export default function DisplayMoviesList(props: Props) {
    const { navigation, movies_data, page, total_page, _loadMovies } = props;

    function _navigateToMovieDetails(id: Id) {
        if (isSearchNavigationProp(navigation)) {
            // Tricks with user-defined type guard for TypeScript to be happy,  the else is actually useless here.
            navigation.navigate('MovieDetails', { id: id });
        } else {
            navigation.navigate('MovieDetails', { id: id });
        }
    }

    return (
        <FlatList
            data={movies_data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <View style={styles.movie_items_container}>
                    <MoviesItems
                        movie={item}
                        _navigateToMovieDetails={_navigateToMovieDetails}
                    />
                </View>
            )}
            onEndReachedThreshold={0.5}
            onEndReached={() => {
                if (page < total_page && _loadMovies !== undefined) {
                    _loadMovies();
                }
            }}
        />
    );
}

const styles = StyleSheet.create({
    movie_items_container: {
        backgroundColor: 'white',
        paddingTop: 5,
        paddingLeft: 5,
    },
});
