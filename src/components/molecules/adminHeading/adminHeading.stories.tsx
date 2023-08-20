import { expect } from '@storybook/jest';
import React from 'react';
import { within } from '@storybook/testing-library';
import AdminHeading from './AdminHeading';

const dest = '/create-article';

const AdminHeadingTemplate = (args) => <AdminHeading {...args} />;

export const AdminHeadingExample = AdminHeadingTemplate.bind({});
AdminHeadingExample.args = {
  heading: 'Heading pages',
  buttonText: 'Button text',
  to: dest,
};
AdminHeadingExample.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const buttonLink = canvas.getByRole('link');
  expect(buttonLink).toHaveAttribute('href', dest);
};

export default {
  title: 'Molecules/Admin Heading',
  component: AdminHeading,
};
