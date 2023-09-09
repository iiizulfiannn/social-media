import React, {useEffect} from 'react';
import {FlatList, RefreshControl, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {useAppDispatch, useAppSelector} from '../../app/store';
import {User, getAllUser} from '../../entity/user/userSlice';
import LoadUserCard from './LoadUserCard';
import UserCard from './UserCard';
import {useNavigation} from '@react-navigation/native';

const UserList = () => {
  const {navigate} = useNavigation();
  const dispatch = useAppDispatch();
  const {page, total, listUser, statusList} = useAppSelector(
    state => state.user,
  );

  const renderFooter = () => {
    return (
      <View style={{backgroundColor: 'white'}}>
        {statusList === 'pending' && page >= 1 && <LoadUserCard />}
      </View>
    );
  };

  const handleLoadMore = () => {
    if (page * 20 <= total && statusList !== 'pending') {
      dispatch(getAllUser(page + 1));
    }
  };

  const handlePullRefresh = (
    <RefreshControl
      refreshing={page > 0 && statusList === 'pending'}
      onRefresh={() => dispatch(getAllUser(0))}
    />
  );

  useEffect(() => {
    dispatch(getAllUser(0));
  }, [dispatch]);

  if (statusList === 'idle') {
    return <LoadUserCard />;
  }

  return (
    <FlatList<User>
      data={listUser}
      renderItem={({item}) => (
        <UserCard
          key={item.id}
          data={item}
          onPress={() => navigate('UserDetailScreen', {userId: item.id})}
        />
      )}
      ListFooterComponent={renderFooter}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.2}
      refreshControl={handlePullRefresh}
      style={{backgroundColor: 'white'}}
    />
  );
};

export default UserList;
