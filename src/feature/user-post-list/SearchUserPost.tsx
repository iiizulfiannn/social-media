import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import {Appbar, Searchbar} from 'react-native-paper';
import {useAppDispatch, useAppSelector} from '../../app/store';
import {cleanSearch, setSearch} from '../../entity/user-post/userPostSlice';

const SearchUserPost = () => {
  const {goBack} = useNavigation();
  const dispatch = useAppDispatch();
  const search = useAppSelector(state => state.userPost.search);

  useEffect(() => {
    return () => {
      dispatch(cleanSearch());
    };
  }, [dispatch]);

  return (
    <View style={{flexDirection: 'row', flex: 1, padding: 16, paddingLeft: 4}}>
      <Appbar.BackAction onPress={goBack} />
      <Searchbar
        style={{flex: 1}}
        placeholder="Search"
        onChangeText={text => dispatch(setSearch(text))}
        value={search}
      />
    </View>
  );
};

export default SearchUserPost;
