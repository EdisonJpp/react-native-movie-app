import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import { COLORS, FONTS, SIZES } from '../lib/constants';
import { Entry } from './SubInfo';

const DetailsBid = ({ bid, handlePress }) => {
  return (
    <TouchableOpacity onPress={() => handlePress()}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: SIZES.base,
          paddingHorizontal: SIZES.base,
        }}
        key={bid.id}
      >
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${bid.backdrop_path}`,
          }}
          resizeMode='contain'
          style={{ width: 48, height: 48 }}
        />

        <View
          style={{
            flex: 1,
            alignItems: 'center',
            paddingHorizontal: SIZES.base,
          }}
        >
          <Text
            style={{
              fontFamily: FONTS.semiBold,
              fontSize: SIZES.small,
              color: COLORS.primary,
            }}
          >
            {bid.title}
          </Text>
          <Text
            style={{
              fontFamily: FONTS.regular,
              fontSize: SIZES.small - 2,
              color: COLORS.secondary,
              marginTop: 3,
            }}
          >
            {bid.original_title}
          </Text>
        </View>

        <Entry label='' price={bid.vote_average} />
      </View>
    </TouchableOpacity>
  );
};

export default DetailsBid;
