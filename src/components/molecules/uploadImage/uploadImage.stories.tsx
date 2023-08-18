import React from 'react';
import UploadImage from './UploadImage';

export const UploadImageExample = () => {
  const [image, setImage] = React.useState<File | null>(null);
  return <UploadImage image={image} setImage={setImage} />;
};

export const UploadImageWithFile = () => {
  const file = new File(['hello'], 'hello.png', { type: 'image/png' });
  const [image, setImage] = React.useState<File | null>(file);
  return <UploadImage image={image} setImage={setImage} />;
};
export default {
  title: 'Molecules/Upload image',
  component: UploadImage,
};
