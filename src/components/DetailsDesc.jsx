import React, { useState } from 'react';
import { Text, View } from 'react-native';

import { COLORS, FONTS, SIZES } from '../lib/constants';
import { Entry, ImageCmp, MovieTitle } from './SubInfo';

const DetailsDesc = ({ data }) => {
  const [text, setText] = useState(data.overview.slice(0, 100));
  const [readMore, setReadMore] = useState(false);

  return (
    <>
      <View
        style={{
          width: '100%',
        }}
      >
        <MovieTitle
          title={data.title}
          subTitle={data.original_title}
          titleSize={SIZES.extraLarge}
          subTitleSize={SIZES.font}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <View style={{ marginTop: 25 }}>
            <Text style={{ fontSize: 15, fontFamily: FONTS.semiBold }}>
              Production Companies
            </Text>
            {data.production_companies.map((productionCompany) => (
              <View
                key={productionCompany.id}
                style={{
                  marginHorizontal: 10,
                  marginTop: 5,
                  alignItems: 'center',
                }}
              >
                <ImageCmp imgUrl={productionCompany.logo_path} />
                <Text>{productionCompany.name.slice(0, 25)} </Text>
              </View>
            ))}
          </View>

          <View
            style={{
              flexDirection: 'column',
              display: 'flex',
              alignItems: 'flex-end',
              marginTop: 25,
            }}
          >
            <Text
              style={{
                marginBottom: 10,
                fontSize: 15,
                fontFamily: FONTS.semiBold,
              }}
            >
              Statistics
            </Text>

            <Entry label='Polarity' price={data.popularity} />
            <Entry label='Vote count' price={data.vote_count} />
            <Entry price={data.vote_average} />
          </View>
        </View>

        {data.belongs_to_collection ? (
          <View style={{ marginTop: 25 }}>
            <Text style={{ fontSize: 15, fontFamily: FONTS.semiBold }}>
              Belongs To Collection
            </Text>
            <View
              key={data.belongs_to_collection.id}
              style={{
                marginHorizontal: 10,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <ImageCmp imgUrl={data.belongs_to_collection.backdrop_path} />
              <Text style={{ marginLeft: 20 }}>
                {data.belongs_to_collection.name}
              </Text>
            </View>
          </View>
        ) : null}
      </View>

      <View style={{ marginVertical: SIZES.extraLarge * 1.5 }}>
        <Text
          style={{
            fontSize: SIZES.font,
            fontFamily: FONTS.semiBold,
            color: COLORS.primary,
          }}
        >
          Description
        </Text>
        <View
          style={{
            marginTop: SIZES.base,
          }}
        >
          <Text
            style={{
              color: COLORS.secondary,
              fontSize: SIZES.small,
              fontFamily: FONTS.regular,
              lineHeight: SIZES.large,
            }}
          >
            {text}
            {!readMore && '...'}
            <Text
              style={{
                color: COLORS.primary,
                fontSize: SIZES.small,
                fontFamily: FONTS.semiBold,
              }}
              onPress={() => {
                if (!readMore) {
                  setText(data.overview);
                  setReadMore(true);
                } else {
                  setText(data.overview.slice(0, 100));
                  setReadMore(false);
                }
              }}
            >
              {readMore ? ' Show Less' : ' Read More'}
            </Text>
          </Text>
        </View>
      </View>
    </>
  );
};

export default DetailsDesc;
