import { expect } from '@storybook/jest';
import React from 'react';
import { userEvent, within } from '@storybook/testing-library';
import TopNavBar from './TopNavBar';

const Template = (args) => <TopNavBar {...args} />;

export const MobileNavbar = Template.bind({});
MobileNavbar.args = {
  variant: 'mobile',
};
MobileNavbar.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const hamburger = canvas.getByTestId('hamburger-menu');
  const menu = canvas.getByTestId('mobileMenu');
  const closeMenu = canvas.getByTestId('close-mobile-menu');

  await userEvent.click(hamburger);
  expect(menu).toBeVisible();

  await userEvent.click(closeMenu);
};

export const TabletNavbar = Template.bind({});
TabletNavbar.args = {
  variant: 'tablet',
};

export const DesktopNavbar = Template.bind({});
DesktopNavbar.args = {
  variant: 'desktop',
};

export default {
  title: 'Organisms/Top Navbar',
  component: TopNavBar,
};
