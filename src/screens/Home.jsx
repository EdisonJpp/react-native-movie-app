import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';

import { FocusedStatusBar, HomeHeader, MovieCard } from '../components';
import LoaderFooter from '../components/LoaderFooter';
import { COLORS } from '../lib/constants';
import { debounce } from '../lib/debounce';
import { useFavorite } from '../lib/favorites.context';

const Home = () => {
  // ------ States ------- //
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [objGenres, setObjGenres] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // ------ Hooks --------- //
  const navigation = useNavigation();
  const [{ objFavorites }, actions] = useFavorite();
  // ------ Functions ------- //

  /**
   * service get movies
   */
  const getMovies = async (page) => {
    setIsLoading(true);
    const queryUrl = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}&api_key=bf091621962bdf5c30339e874a2a0c1a`;

    axios
      .get(queryUrl)
      .then(({ data }) => {
        data.results && setMovies((curr) => [...curr, ...data.results]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  /**
   *
   * @returns Genres: get all genres
   */
  const getGenres = useCallback(async () => {
    if (Object.keys(objGenres).length > 0) return;
    const queryUrl = `https://api.themoviedb.org/3/genre/movie/list?language=en-US&api_key=bf091621962bdf5c30339e874a2a0c1a`;

    axios.get(queryUrl).then(({ data }) => {
      data.genres &&
        setObjGenres(() =>
          data.genres.reduce(
            (acc, curr) => ({ ...acc, [curr.id]: curr.name }),
            {}
          )
        );
    });
  }, []);

  /**
   * Update current page
   */
  const loadMoreItem = () => {
    setPage((curr) => curr + 1);
  };

  /**
   *  get movies and paginate at the same time optimized
   */
  const optimizedGetMovies = useCallback(debounce(getMovies), []);

  // ------ Effects ------- //
  useEffect(() => {
    getGenres();
    optimizedGetMovies(page);
  }, [page]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusedStatusBar backgroundColor={COLORS.primary} />
      <View style={{ flex: 1 }}>
        <View style={{ zIndex: 0 }}>
          <FlatList
            data={movies}
            onEndReachedThreshold={0}
            onEndReached={loadMoreItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={isLoading ? LoaderFooter : null}
            renderItem={({ item }) => (
              <MovieCard
                actions={actions}
                navigation={navigation}
                isFavorite={!!objFavorites[item.id]}
                item={{
                  ...item,
                  genres: item.genre_ids
                    .map((genreId) => objGenres[genreId])
                    .join(', '),
                }}
                objGenres={objGenres}
              />
            )}
            ListHeaderComponent={<HomeHeader onSearch={() => {}} />}
          />
        </View>

        <View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            zIndex: -1,
          }}
        >
          <View style={{ height: 300, backgroundColor: COLORS.primary }} />
          <View style={{ flex: 1, backgroundColor: COLORS.white }} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
