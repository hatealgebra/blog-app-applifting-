import React from 'react';
import Avatar from './Avatar';

import userAvatarPhoto from '../../../images/avatar-mock.jpg';
import { ComponentMeta } from '@storybook/react';

export const DifferentImages = () => {
  return (
    <>
      <Avatar src={userAvatarPhoto} alt="Generic user avatar" />
      <Avatar />
    </>
  );
};

export const AllSizes = () => {
  return (
    <>
      <Avatar size="lg" src={userAvatarPhoto} alt="Generic user avatar" />
      <Avatar size="md" src={userAvatarPhoto} alt="Generic user avatar" />
      <Avatar size="sm" src={userAvatarPhoto} alt="Generic user avatar" />
    </>
  );
};

export default {
  title: 'Atoms/Avatar',
  component: Avatar,
  decorators: [
    (Story) =>
      (
        <div style={{ display: 'flex', gap: '5px', alignItems: 'flex-end' }}>
          <Story />
        </div>
      ) as ComponentMeta<typeof Avatar>,
  ],
};
