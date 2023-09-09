import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import PostCard from '../../entity/post/PostCard';
import Post from '../../entity/post/model';
import {addPostToStorage} from '../../entity/post/postManager';
import {getStorage} from '../../shared/helper/storage';

const LikeList = ({header}: {header: () => React.ReactNode}) => {
  const isFocussed = useIsFocused();
  const [listLikePost, setListLikePost] = useState<Post[]>([]);
  const itemPress = (data: Post) => {
    console.log(data);
  };

  // const getCommentByPostid = async () => {
  //   try {
  //     const response = await apiInstance.get(`/post/${}`)
  //   } catch (error) {

  //   }
  // }

  const likePress = (post: Post) => {
    addPostToStorage(post);
    const posts = getStorage<{data: Post[]}>('posts');
    if (posts) {
      setListLikePost(posts.data);
    } else {
      setListLikePost([]);
    }
  };

  useEffect(() => {
    const posts = getStorage<{data: Post[]}>('posts');
    if (posts) {
      setListLikePost(posts.data);
    }
  }, [isFocussed]);

  return (
    <FlatList<Post>
      data={listLikePost}
      renderItem={({item}) => (
        <PostCard
          key={item.id}
          data={item}
          onPress={post => itemPress(post)}
          onLike={post => likePress(post)}
          onComment={postId => console.log(postId)}
        />
      )}
      ListHeaderComponent={header}
      style={{backgroundColor: 'white'}}
    />
  );
};

export default LikeList;
