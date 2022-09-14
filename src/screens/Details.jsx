import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from 'react-native';

import {
  CircleButton,
  DetailsBid,
  DetailsDesc,
  FocusedStatusBar,
  RectButton,
  SubInfo,
} from '../components';
import LoaderFooter from '../components/LoaderFooter';
import { assets, COLORS, FONTS, SHADOWS, SIZES } from '../lib/constants';
import { useFavorite } from '../lib/favorites.context';

const defaultMovie = {
  overview: '',
  production_companies: [],
  belongs_to_collection: {},
  vote_count: 0,
  vote_average: 0,
  popularity: 0,
};

const DetailsHeader = ({
  data,
  navigation,
  isFavorite,
  handleFavoriteToggle,
}) => (
  <View style={{ width: '100%', height: 373 }}>
    <Image
      source={{
        uri: `https://image.tmdb.org/t/p/original${data.backdrop_path}`,
      }}
      resizeMode='cover'
      style={{ width: '100%', height: '100%' }}
    />

    <CircleButton
      imgUrl={assets.left}
      handlePress={() => navigation.goBack()}
      left={15}
      top={StatusBar.currentHeight + 10}
    />

    {isFavorite ? (
      <CircleButton
        imgUrl={assets.heart}
        handlePress={handleFavoriteToggle(data)}
        right={15}
        top={StatusBar.currentHeight + 10}
      />
    ) : (
      <CircleButton
        imgUrl={assets.filledHeart}
        handlePress={handleFavoriteToggle(data)}
        right={15}
        top={StatusBar.currentHeight + 10}
      />
    )}
  </View>
);

const Details = ({ route, navigation }) => {
  const { data } = route.params;

  // ------- States -------- //
  const [rawItem, setRawItem] = useState(defaultMovie);
  const [isLoading, setIsLoading] = useState(false);

  // ------- Hooks -------- //
  const [{ movies, objFavorites }, actions] = useFavorite();

  // ------- Effects -------- //
  useEffect(() => {
    const fn = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${data.id}?api_key=bf091621962bdf5c30339e874a2a0c1a`
        );
        setRawItem(res.data);
      } finally {
        setIsLoading(false);
      }
    };

    data.id && fn();
  }, [data.id]);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: Platform.OS === 'ios' ? 'white' : '' }}
    >
      {isLoading ? (
        <LoaderFooter />
      ) : (
        <>
          <FocusedStatusBar
            barStyle='dark-content'
            backgroundColor='transparent'
            translucent={true}
          />

          <View
            style={{
              width: '100%',
              position: 'absolute',
              bottom: 0,
              paddingVertical: SIZES.font,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(255,255,255,0.5)',
              zIndex: 1,
            }}
          >
            <RectButton
              text={
                objFavorites[rawItem.id]
                  ? 'Remove from favorites'
                  : 'Add to favorites'
              }
              backgroundColor={
                objFavorites[rawItem.id] ? COLORS.danger : COLORS.primary
              }
              minWidth={170}
              fontSize={SIZES.large}
              handlePress={actions.handleToggle(rawItem)}
              {...SHADOWS.dark}
            />
          </View>

          <FlatList
            data={movies}
            renderItem={({ item }) =>
              item.id === rawItem.id ? null : (
                <DetailsBid
                  handlePress={() =>
                    navigation.navigate('Details', { data: item })
                  }
                  bid={item}
                />
              )
            }
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: SIZES.extraLarge * 3,
            }}
            ListHeaderComponent={() => (
              <React.Fragment>
                <DetailsHeader
                  isFavorite={!!objFavorites[rawItem.id]}
                  handleFavoriteToggle={actions.handleToggle}
                  data={rawItem}
                  navigation={navigation}
                />
                <SubInfo
                  release={rawItem.release_date}
                  genres={rawItem.genres?.map((it) => it.name).join(', ')}
                />
                <View style={{ padding: SIZES.font }}>
                  <DetailsDesc data={rawItem} />

                  <Text
                    style={{
                      fontSize: SIZES.font,
                      fontFamily: FONTS.semiBold,
                      color: COLORS.primary,
                    }}
                  >
                    Current Favorites
                  </Text>
                </View>
              </React.Fragment>
            )}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default Details;
