import React from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function LoaderFooter() {
  return (
    <View
      style={{
        marginVertical: 16,
        alignItems: 'center',
      }}
    >
      <ActivityIndicator size='large' color='#aaa' />
    </View>
  );
}
