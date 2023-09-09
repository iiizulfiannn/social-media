import React from 'react';
import UserDetail from '../feature/user-detail';
import PostList from '../feature/user-post-list';
import SearchUserPost from '../feature/user-post-list/SearchUserPost';

const UserDetailScreen = () => {
  return (
    <PostList
      header={() => (
        <>
          <SearchUserPost />
          <UserDetail />
        </>
      )}
    />
  );
};

export default UserDetailScreen;
