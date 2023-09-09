import React from 'react';
import {View} from 'react-native';
import {Chip} from 'react-native-paper';
import {useAppDispatch, useAppSelector} from '../../app/store';
import {getAllPost, setTag} from '../../entity/post/postSlice';

const PostFilterTags = () => {
  const dispatch = useAppDispatch();
  const tag = useAppSelector(state => state.post.tag);

  return (
    tag && (
      <View style={{padding: 16, flexDirection: 'row', columnGap: 16}}>
        <Chip
          onPress={() => {
            dispatch(setTag(''));
            dispatch(getAllPost(0));
          }}
          icon="close"
          mode="flat">
          {tag}
        </Chip>
      </View>
    )
  );
};

export default PostFilterTags;
