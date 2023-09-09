import React, {useEffect} from 'react';
import {FlatList, RefreshControl, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../app/store';
import LoadPostCard from '../../entity/post/LoadPostCard';
import PostCard from '../../entity/post/PostCard';
import Post from '../../entity/post/model';
import {
  setPost,
  getAllPost,
  getAllPostByTag,
  setTag,
} from '../../entity/post/postSlice';

const PostList = ({header}: {header: () => React.ReactNode}) => {
  const dispatch = useAppDispatch();
  const {
    page,
    total,
    listPost,
    statusList,
    tag: tagState,
  } = useAppSelector(state => state.post);

  const itemPress = (data: Post) => {
    console.log(data);
  };

  const likePress = (post: Post) => {
    dispatch(setPost(post));
  };

  const tagPress = (tag: string) => {
    dispatch(setTag(tag));
    if (tagState === tag) {
      return;
    }
    dispatch(getAllPostByTag({tag, pageNumber: 0}));
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
      if (tagState) {
        dispatch(getAllPostByTag({tag: tagState, pageNumber: page + 1}));
      } else {
        dispatch(getAllPost(page + 1));
      }
    }
  };

  const handlePullRefresh = (
    <RefreshControl
      refreshing={page > 0 && statusList === 'pending'}
      onRefresh={() => {
        if (tagState) {
          dispatch(getAllPostByTag({tag: tagState, pageNumber: 0}));
        } else {
          dispatch(getAllPost(0));
        }
      }}
    />
  );

  useEffect(() => {
    dispatch(getAllPost(0));
  }, [dispatch]);

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
          onTag={tag => tagPress(tag)}
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

export default PostList;
