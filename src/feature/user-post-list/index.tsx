import {useRoute} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {FlatList, RefreshControl, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../app/store';
import {
  setPost,
  cleanSearch,
  getAllUserPost,
} from '../../entity/user-post/userPostSlice';
import {getUser} from '../../entity/user/userSlice';
import LoadPostCard from '../../entity/post/LoadPostCard';
import PostCard from '../../entity/post/PostCard';
import Post from '../../entity/post/model';

const UserPostList = ({header}: {header: () => React.ReactNode}) => {
  const dispatch = useAppDispatch();
  const {params} = useRoute();
  const userId = params?.userId;
  const {page, total, listPost, statusList} = useAppSelector(
    state => state.userPost,
  );

  const itemPress = (data: Post) => {
    console.log(data);
  };

  const likePress = (post: Post) => {
    dispatch(setPost(post));
  };

  const renderFooter = () => {
    return (
      <View style={{backgroundColor: 'white'}}>
        {statusList === 'pending' && page >= 1 && <LoadPostCard />}
      </View>
    );
  };

  const handleLoadMore = () => {
    console.log('handleLoadMore');
    if (page * 20 <= total && statusList !== 'pending') {
      dispatch(getAllUserPost({userId, pageNumber: page + 1}));
    }
  };

  const handlePullRefresh = (
    <RefreshControl
      refreshing={page > 0 && statusList === 'pending'}
      onRefresh={() => {
        dispatch(getUser(userId));
        dispatch(getAllUserPost({userId, pageNumber: 0}));
        dispatch(cleanSearch());
      }}
    />
  );

  useEffect(() => {
    dispatch(getAllUserPost({userId, pageNumber: 0}));
  }, []);

  if (statusList === 'idle') {
    return <LoadPostCard />;
  }

  return (
    <FlatList<Post>
      data={listPost}
      renderItem={({item}) => (
        <PostCard
          key={item.id}
          data={item}
          onPress={post => itemPress(post)}
          onLike={post => likePress(post)}
        />
      )}
      ListHeaderComponent={header}
      ListFooterComponent={renderFooter}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.2}
      refreshControl={handlePullRefresh}
      style={{backgroundColor: 'white'}}
    />
  );
};

export default UserPostList;
