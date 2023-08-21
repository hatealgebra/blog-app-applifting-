import { expect } from '@storybook/jest';
import React from 'react';
import { userEvent, within } from '@storybook/testing-library';
import LoginStatus from './LoginStatus';

// TODO: Add test for the items in story
const Template = (args) => <LoginStatus {...args} />;

export const LoginStatusExample = Template.bind({});
LoginStatusExample.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const avatarButton = canvas.getByRole('button', { name: 'avatar-button' });
  const menu = canvas.getByLabelText('admin-menu');
  await userEvent.click(avatarButton);
  expect(menu).toBeVisible();
};

export default {
  title: 'Molecules/Login Status',
  component: LoginStatus,
};
