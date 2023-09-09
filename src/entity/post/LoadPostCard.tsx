import {Dimensions, View} from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const {width} = Dimensions.get('screen');

const LoadPostCard = () => {
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      {Array.from(Array(10), (_, i) => (
        <SkeletonPlaceholder key={i}>
          <View style={{rowGap: 8, marginBottom: 16}}>
            <View
              style={{
                flexDirection: 'row',
                marginLeft: 16,
                alignItems: 'center',
              }}>
              <View style={{width: 48, height: 48, borderRadius: 24}} />
              <View style={{marginLeft: 16, width: width - 96, height: 32}} />
            </View>
            <View style={{width, height: (width * 9) / 16}} />
            <View style={{rowGap: 4}}>
              <View style={{marginLeft: 16, width: '50%', height: 16}} />
              <View style={{marginLeft: 16, width: '35%', height: 16}} />
              <View style={{marginLeft: 16, width: '20%', height: 16}} />
            </View>
          </View>
        </SkeletonPlaceholder>
      ))}
    </View>
  );
};

export default LoadPostCard;
