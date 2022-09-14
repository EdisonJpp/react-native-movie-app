import React from 'react';
import { Image, View } from 'react-native';

import { assets, COLORS, SHADOWS, SIZES } from '../lib/constants';
import { CircleButton, RectButton } from './Button';
import { Entry, MovieTitle, SubInfo } from './SubInfo';

const MovieCard = ({ item, isFavorite, actions, navigation }) => {
  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        borderRadius: SIZES.font,
        marginBottom: SIZES.extraLarge,
        margin: SIZES.base,
        ...SHADOWS.dark,
      }}
    >
      <View
        style={{
          width: '100%',
          height: 250,
        }}
      >
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${item.backdrop_path}`,
          }}
          resizeMode='cover'
          style={{
            width: '100%',
            height: '100%',
            borderTopLeftRadius: SIZES.font,
            borderTopRightRadius: SIZES.font,
          }}
        />

        {isFavorite ? (
          <CircleButton
            handlePress={actions.handleToggle(item)}
            imgUrl={assets.heart}
            right={10}
            top={10}
          />
        ) : (
          <CircleButton
            handlePress={actions.handleToggle(item)}
            imgUrl={assets.filledHeart}
            right={10}
            top={10}
          />
        )}
      </View>

      <SubInfo genres={item.genres} release={item.release_date} />

      <View style={{ width: '100%', padding: SIZES.font }}>
        <MovieTitle
          title={item.title}
          subTitle={item.overview}
          titleSize={SIZES.large}
          subTitleSize={SIZES.small}
        />

        <View
          style={{
            marginTop: SIZES.font,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Entry price={item.vote_average} />
          <RectButton
            minWidth={120}
            fontSize={SIZES.font}
            handlePress={() => navigation.navigate('Details', { data: item })}
          />
        </View>
      </View>
    </View>
  );
};

export default MovieCard;
