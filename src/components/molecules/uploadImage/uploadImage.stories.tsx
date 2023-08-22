import { expect, jest } from '@storybook/jest';
import React from 'react';
import { userEvent, within } from '@storybook/testing-library';
import UploadImage from './UploadImage';

global.URL.createObjectURL = jest.fn();

const mockOriginalFile = new File(['goodbye'], 'goodbye.png', {
  type: 'image/png',
});

const mockSetImage = jest.fn(() => mockOriginalFile);

const UploadImageTemplate = (args) => {
  const [image, setImage] = React.useState<File | null>(args.image);

  const uploadImage = () => {
    setImage(args.setImage);
  };

  return <UploadImage image={image} setImage={uploadImage} />;
};

export const UploadImageExample = UploadImageTemplate.bind({});
UploadImageExample.args = {
  image: null,
  setImage: mockSetImage,
};
UploadImageExample.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const uploader = canvas.getByTestId('image-uploader');
  await userEvent.upload(uploader, mockOriginalFile);
  const image = canvas.getByAltText('goodbye.png');
  expect(image).toBeInTheDocument();
};

export const ImageDeleted = UploadImageTemplate.bind({});
ImageDeleted.args = {
  image: mockOriginalFile,
  setImage: mockSetImage,
};
ImageDeleted.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const deleteBtn = await canvas.findByRole('button', {
    name: 'Delete',
  });
  await userEvent.click(deleteBtn);
  expect(mockSetImage).toHaveBeenCalled();
};

export default {
  title: 'Molecules/Upload image',
  component: UploadImage,
};
