import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {Pressable, View} from 'react-native';
import {Avatar, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DynamicImage from '../../shared/component/DynamicImage';
import {apiInstance} from '../../shared/helper/baseApi';
import {getStorage} from '../../shared/helper/storage';
import Comment from '../comment/model';
import Post from './model';

const PostCard = ({
  data,
  onPress,
  onLike,
  onTag,
  onComment,
}: {
  data: Post;
  onPress: (post: Post) => void;
  onLike: (post: Post) => void;
  onTag?: (tag: string) => void;
  onComment?: (postId: string) => void;
}) => {
  const [isLike, setIsLike] = useState(false);
  const [isComment, setIsComment] = useState(false);
  const [comments, setComments] = useState<{
    data: Comment[];
    total: 0;
    page: number;
    limit: number;
  }>({data: [], total: 0, page: 0, limit: 0});

  useEffect(() => {
    const getComments = async () => {
      try {
        const response = await apiInstance.get(`/post/${data.id}/comment`);
        if (response.data) {
          setComments(response.data);
        }
      } catch (error) {
        console.log('Error ', JSON.stringify(error));
      }
    };

    getComments();
  }, [data.id]);

  // console.log('\ncomments ', data.id, comments);

  const handleLike = () => {
    const updatePost = {
      ...data,
      isLike: !isLike,
    };
    setIsLike(prevLike => !prevLike);
    onLike(updatePost);
  };

  useEffect(() => {
    const posts = getStorage<{data: Post[]}>('posts');
    if (posts && posts.data) {
      const post = posts.data.find(post => post.id === data.id);
      if (post) {
        setIsLike(post.isLike || false);
      }
    }
  }, [data.id]);

  return (
    <Pressable
      onPress={() => onPress(data)}
      style={{rowGap: 8, marginBottom: 16}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 8,
          columnGap: 8,
        }}>
        <Avatar.Image source={{uri: data.owner.picture}} size={48} />
        <View>
          <Text>{`${data.owner.firstName} ${data.owner.lastName}`}</Text>
          <Text>
            {moment(data.publishDate).format('DD MMMM YYYY - HH:mm:ss')}
          </Text>
        </View>
      </View>
      <DynamicImage imageUrl={data.image} />
      <View style={{rowGap: 4, paddingHorizontal: 8}}>
        <View style={{flexDirection: 'row', columnGap: 4}}>
          {data.tags.map((item, index) => (
            <Pressable key={index} onPress={() => (onTag ? onTag(item) : {})}>
              <Text
                style={{
                  paddingVertical: 2,
                  paddingHorizontal: 4,
                  borderWidth: 1,
                  borderColor: 'black',
                  borderRadius: 5,
                }}>
                {item}
              </Text>
            </Pressable>
          ))}
        </View>
        <Text>{data.text}</Text>
        <View style={{flexDirection: 'row', columnGap: 16}}>
          <View style={{flexDirection: 'row', columnGap: 4}}>
            <Pressable onPress={handleLike}>
              <Icon
                name={isLike ? 'favorite' : 'favorite-outline'}
                size={24}
                color={isLike ? 'red' : 'black'}
              />
            </Pressable>
            <Text>{data.likes} likes</Text>
          </View>
          {onComment && (
            <View style={{flexDirection: 'row', columnGap: 4}}>
              <Text>{comments.total}</Text>
              <Pressable
                onPress={() => {
                  if (isComment) {
                    setIsComment(false);
                  } else {
                    setIsComment(true);
                    onComment(data.id);
                  }
                }}>
                <Text>comments</Text>
              </Pressable>
            </View>
          )}
        </View>
        <View style={{paddingLeft: 32}}>
          {isComment &&
            comments.data.length > 0 &&
            comments.data.map(comment => (
              <View
                key={comment.id}
                style={{flexDirection: 'row', columnGap: 8}}>
                <Text style={{fontWeight: '700', textTransform: 'lowercase'}}>
                  {comment.owner.firstName}
                </Text>
                <Text>{comment.message}</Text>
              </View>
            ))}
        </View>
      </View>
    </Pressable>
  );
};

export default PostCard;
