import {useEffect, useState} from 'react';
import {Dimensions, Image} from 'react-native';

const fullWidth = Dimensions.get('screen').width;

const DynamicImage = ({imageUrl}: {imageUrl: string}) => {
  const [imageDimensions, setImageDimensions] = useState({width: 0, height: 0});

  useEffect(() => {
    Image.getSize(imageUrl, (width, height) => {
      setImageDimensions({width, height});
    });
  }, [imageUrl]);

  return (
    imageDimensions.height !== 0 && (
      <Image
        source={{uri: imageUrl}}
        style={{
          width: fullWidth,
          height: (fullWidth * imageDimensions.height) / imageDimensions.width,
        }}
      />
    )
  );
};

export default DynamicImage;
