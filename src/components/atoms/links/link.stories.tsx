import { expect } from '@storybook/jest';
import React from 'react';

import { within } from '@storybook/testing-library';
import Link from './link.styled';
import LoginLink from './LoginLink';

export const LinkExample = () => <Link to="/#">Basic link</Link>;
LinkExample.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const link = canvas.getByRole('link');
  expect(link).toHaveAttribute('href', '/#');
};

export const LogLinkExample = () => <LoginLink />;
LogLinkExample.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const link = canvas.getByRole('link');
  expect(link).toHaveAttribute('href', '/login');
};

export const AllVariants = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
    <Link to="/#">Classic link</Link>
    <Link variant="text" to="/#">
      Text link
    </Link>
    <LoginLink />
  </div>
);

export default {
  component: Link,
  subcomponent: { LoginLink },
  title: 'Atoms/Link',
};
