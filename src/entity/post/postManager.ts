import {getStorage, setStorage} from '../../shared/helper/storage';
import Post from './model';

export const addPostToStorage = (data: Post) => {
  const postId = data.id;
  const posts = getStorage<{data: Post[]}>('posts');
  if (!posts) {
    setStorage('posts', {data: [data]});
  } else {
    const isPostExist = posts.data.find(post => post.id === postId);
    if (!isPostExist) {
      setStorage('posts', {data: [...posts.data, data]});
    } else {
      const updatePosts = posts.data
        .map(post => {
          if (post.id === postId) {
            post.isLike = data.isLike;
          }
          return post;
        })
        .filter(post => post.isLike);

      setStorage('posts', {data: updatePosts});
    }
  }
};
