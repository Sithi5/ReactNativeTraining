import { View, Text, StyleSheet, Image } from 'react-native';
import MovieData from '../utils/MovieData';

type Props = {
  movie: MovieData;
};

function MoviesItems(props: Props) {
  let movie = props.movie;
  return (
    <View style={styles.main_container}>
      <Image
        style={styles.movie_image}
        source={require('../assets/star_wars_l_ascension_de_skywalker.png')}
      />
      <View style={styles.content_main_container}>
        <View style={styles.content_top_container}>
          <Text style={styles.title_text}>{movie.title}</Text>
          <Text style={styles.vote_text}>{movie.vote_average}</Text>
        </View>

        <View style={styles.content_middle_container}>
          <Text style={styles.description_text} numberOfLines={6}>
            {movie.overview}
          </Text>
        </View>
        <View style={styles.content_bottom_container}>
          <Text style={styles.date_text}>{movie.release_date}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main_container: {
    backgroundColor: 'lightgrey',
    flexDirection: 'row',
    height: 190,
  },
  movie_image: {
    width: 120,
    height: 180,
    margin: 5,
    backgroundColor: 'gray',
  },
  content_main_container: {
    flexDirection: 'column',
    flex: 1,
    margin: 5,
  },
  content_top_container: {
    flexDirection: 'row',
    flex: 3,
  },
  content_middle_container: { flex: 7 },
  content_bottom_container: {
    flex: 1,
  },
  title_text: {
    textAlign: 'left',
    flex: 1,
    flexWrap: 'wrap',
    fontWeight: 'bold',
    fontSize: 20,
  },
  vote_text: {
    textAlign: 'right',
    fontWeight: 'bold',
    color: 'grey',
    flex: 1,
    fontSize: 25,
  },
  description_text: { fontStyle: 'italic', color: 'grey' },
  date_text: { textAlign: 'right' },
});

export default MoviesItems;
