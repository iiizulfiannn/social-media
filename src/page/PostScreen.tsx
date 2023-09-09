import React from 'react';
import {Appbar} from 'react-native-paper';
import PostFilterTags from '../feature/post-filter-tags';
import PostList from '../feature/post-list';

const PostScreen = () => {
  return (
    <PostList
      header={() => (
        <>
          <Appbar.Header>
            <Appbar.Content title="Post" />
          </Appbar.Header>
          <PostFilterTags />
        </>
      )}
    />
  );
};

export default PostScreen;
