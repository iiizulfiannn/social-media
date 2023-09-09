import {Dimensions, View} from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const {width} = Dimensions.get('screen');

const LoadUserCard = () => {
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      {Array.from(Array(10), (_, i) => (
        <SkeletonPlaceholder key={i}>
          <View style={{margin: 16}}>
            <View style={{flexDirection: 'row'}}>
              <View style={{width: 48, height: 48, borderRadius: 24}} />
              <View style={{marginLeft: 16, width: width - 96, height: 48}} />
            </View>
          </View>
        </SkeletonPlaceholder>
      ))}
    </View>
  );
};

export default LoadUserCard;
