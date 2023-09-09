import React from 'react';
import {Appbar} from 'react-native-paper';
import LikeList from '../feature/like-list';

const FavoriteScreen = () => {
  return (
    <>
      <LikeList
        header={() => (
          <>
            <Appbar.Header>
              <Appbar.Content title="Your Like" />
            </Appbar.Header>
          </>
        )}
      />
    </>
  );
};

export default FavoriteScreen;
