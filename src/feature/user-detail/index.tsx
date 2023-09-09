import {useRoute} from '@react-navigation/native';
import moment from 'moment';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import {Avatar, Text} from 'react-native-paper';
import FriendButton from './FriendButton';
import {useAppDispatch, useAppSelector} from '../../app/store';
import {getUser} from '../../entity/user/userSlice';

const UserDetail = () => {
  const dispatch = useAppDispatch();
  const {params} = useRoute();
  const userId = params?.userId;

  const {
    firstName,
    lastName,
    email,
    picture,
    gender,
    dateOfBirth,
    registerDate,
    location,
  } = useAppSelector(state => state.user.selectedUser);

  useEffect(() => {
    dispatch(getUser(userId));
  }, []);

  return (
    <>
      <View style={{rowGap: 16, padding: 16}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          {picture && (
            <Avatar.Image
              source={{
                uri: picture,
              }}
              size={80}
            />
          )}
          <View style={{alignItems: 'center'}}>
            <Text>Gender</Text>
            <Text variant="bodyLarge" style={{textTransform: 'capitalize'}}>
              {gender}
            </Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text>Date of Birth</Text>
            <Text variant="bodyLarge">
              {moment(dateOfBirth).format('DD MMM YYYY')}
            </Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text>Join from</Text>
            <Text variant="bodyLarge">
              {moment(registerDate).format('DD MMM YYYY')}
            </Text>
          </View>
        </View>
        <View>
          <Text variant="bodyLarge" style={{fontWeight: '700'}}>
            {firstName} {lastName}
          </Text>
          <Text>{email}</Text>
          <Text>
            {location?.street}, {location?.city} {location?.country}
          </Text>
        </View>
        <FriendButton userId={userId} />
      </View>
    </>
  );
};

export default UserDetail;
