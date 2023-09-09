import React from 'react';
import {Avatar, List} from 'react-native-paper';
import {User} from '../../entity/user/userSlice';

const UserCard = ({data, onPress}: {data: User; onPress: () => void}) => {
  return (
    <List.Item
      onPress={onPress}
      title={`${data.firstName} ${data.lastName}`}
      description={data.title}
      left={props => (
        <Avatar.Image {...props} size={48} source={{uri: data.picture}} />
      )}
    />
  );
};

export default UserCard;
