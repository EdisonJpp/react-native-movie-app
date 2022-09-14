import React from 'react';
import { Image, Text, TextInput, View } from 'react-native';

import { assets, COLORS, FONTS, SIZES } from '../lib/constants';
import { useFavorite } from '../lib/favorites.context';
import { CircleButton } from './Button';

const HomeHeader = ({ onSearch }) => {
  const [state] = useFavorite();
  return (
    <View
      style={{
        backgroundColor: COLORS.primary,
        padding: SIZES.font,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Image
          source={assets.logo}
          resizeMode='contain'
          style={{ width: 50, height: 42, marginTop: 10 }}
        />

        <View style={{ width: 85, height: 45, alignItems: 'center' }}>
          <CircleButton imgUrl={assets.person01} right={10} top={4} />
          <Text
            style={{
              fontFamily: FONTS.semiBold,
              fontSize: 12,
              color: COLORS.white,
              position: 'absolute',
              bottom: -22,
              right: -1,
            }}
          >
            Favorites: {state.count}
          </Text>
        </View>
      </View>

      <View style={{ marginVertical: SIZES.font }}>
        <Text
          style={{
            fontFamily: FONTS.regular,
            fontSize: SIZES.small,
            color: COLORS.white,
          }}
        >
          Hello 👋
        </Text>

        <Text
          style={{
            fontFamily: FONTS.bold,
            fontSize: SIZES.large,
            color: COLORS.white,
            marginTop: SIZES.base / 2,
          }}
        >
          Let’s find the best movie
        </Text>
      </View>

      <View style={{ marginTop: SIZES.font }}>
        <View
          style={{
            width: '100%',
            borderRadius: SIZES.font,
            backgroundColor: COLORS.gray,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: SIZES.font,
            paddingVertical: SIZES.small - 2,
          }}
        >
          <Image
            source={assets.search}
            resizeMode='contain'
            style={{ width: 20, height: 20, marginRight: SIZES.base }}
          />
          <TextInput
            placeholder='Search NFTs'
            style={{ flex: 1 }}
            onChangeText={onSearch}
          />
        </View>
      </View>
    </View>
  );
};

export default HomeHeader;
