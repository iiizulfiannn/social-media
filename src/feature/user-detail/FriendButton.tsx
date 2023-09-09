import React, {useEffect, useState} from 'react';
import {Button} from 'react-native-paper';
import {storage} from '../../shared/helper/storage';

const FriendButton = ({userId}: {userId: string}) => {
  const [isToggled, setIsToggled] = useState(false);

  useEffect(() => {
    const isFriend = storage.getBoolean(userId);
    setIsToggled(isFriend || false);
  }, []);

  const toggleFriend = () => {
    storage.set(userId, !isToggled);
    setIsToggled(prevState => !prevState);
  };

  return (
    <Button
      onPress={toggleFriend}
      icon={isToggled ? 'account-check' : 'account-plus'}
      mode={isToggled ? 'outlined' : 'contained'}
      textColor={isToggled ? 'green' : 'white'}
      style={{borderColor: isToggled ? 'green' : undefined}}>
      {isToggled ? 'Remove Friend' : 'Add Friend'}
    </Button>
  );
};

export default FriendButton;
