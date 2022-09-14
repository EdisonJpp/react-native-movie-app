import React from 'react';
import { Image, Text, View } from 'react-native';

import { COLORS, FONTS, SHADOWS, SIZES } from '../lib/constants';

export const MovieTitle = ({ title, subTitle, titleSize, subTitleSize }) => {
  return (
    <View>
      <Text
        style={{
          fontFamily: FONTS.semiBold,
          fontSize: titleSize,
          color: COLORS.primary,
        }}
      >
        {title}
      </Text>
      <Text
        numberOfLines={2}
        style={{
          fontFamily: FONTS.regular,
          fontSize: subTitleSize,
          color: COLORS.primary,
        }}
      >
        {subTitle}
      </Text>
    </View>
  );
};

export const Entry = ({ label = 'Vote average:', price }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text
        style={{
          fontFamily: FONTS.medium,
          fontSize: SIZES.font,
          color: COLORS.primary,
        }}
      >
        {label}
      </Text>
      <Text
        style={{
          fontFamily: FONTS.medium,
          fontSize: SIZES.font,
          color: COLORS.secondary,
          marginLeft: 5,
        }}
      >
        {price.toLocaleString()} 🔥
      </Text>
    </View>
  );
};

export const ImageCmp = ({ imgUrl, index }) => {
  return (
    <Image
      source={{
        uri: `https://image.tmdb.org/t/p/w500${imgUrl}`,
      }}
      resizeMode='contain'
      style={{
        width: 48,
        height: 48,
        marginLeft: index === 0 ? 0 : -SIZES.font,
      }}
    />
  );
};

export const People = ({ productionCompanies }) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      {(productionCompanies || []).map(({ logo_path }, index) => (
        <ImageCmp imgUrl={logo_path} index={index} key={`People-${index}`} />
      ))}
      <Text> Production company </Text>
    </View>
  );
};

export const Entry2 = ({ label, release }) => {
  return (
    <View
      style={{
        paddingHorizontal: SIZES.font,
        paddingVertical: SIZES.base,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.font,
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.light,
        elevation: 1,
        maxWidth: '50%',
      }}
    >
      <Text
        style={{
          fontFamily: FONTS.regular,
          fontSize: SIZES.small,
          color: COLORS.primary,
        }}
      >
        {label}
      </Text>
      <Text
        numberOfLines={1}
        style={{
          fontFamily: FONTS.semiBold,
          fontSize: SIZES.medium,
          color: COLORS.primary,
        }}
      >
        {release}
      </Text>
    </View>
  );
};

export const SubInfo = ({ release, genres }) => {
  return (
    <View
      style={{
        width: '100%',
        paddingHorizontal: SIZES.font,
        marginTop: -SIZES.extraLarge,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <Entry2 label='Genres' release={genres} />
      <Entry2 label='Release date' release={release} />
    </View>
  );
};
