import React from 'react';

import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/dom';
import { setupTestWithStore } from '../../../utils/testing.utils';
import LoginStatus from './LoginStatus';

describe('Check the menu functionality', () => {
  let avatarButton: HTMLElement;
  let menu: HTMLElement;
  beforeEach(() => {
    const { getByRole, getByLabelText } = setupTestWithStore(<LoginStatus />);
    avatarButton = getByRole('button', { name: 'avatar-button' });
    menu = getByLabelText('admin-menu');
    userEvent.click(avatarButton);
  });
  test('Shows logged in user', async () => {
    await waitFor(() => expect(menu).toBeVisible());
  });
  test('When button clicked again, menu is close', async () => {
    userEvent.click(avatarButton);
    await waitFor(() => expect(menu).not.toBeVisible());
  });
});
