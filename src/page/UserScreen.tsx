import React from 'react';
import {Appbar} from 'react-native-paper';
import UserList from '../feature/user-list';

const UserScreen = () => {
  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="User" />
      </Appbar.Header>
      <UserList />
    </>
  );
};

export default UserScreen;
