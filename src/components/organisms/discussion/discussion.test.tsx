import React from 'react';
import userEvent from '@testing-library/user-event';

import { screen, waitFor } from '@testing-library/dom';
import { setupWithLoggedInUser } from '../../../utils/testing.utils';
import { DiscussionExample } from './discussion.stories';

import { USER_CONFIG } from '../../../services/services.config';

// TODO: Write tests
describe('Discussion handling', () => {
  test('Create comment', async () => {
    const commentExample =
      'This is my new comment! It needs to be little bit longer. Yup, here you go';
    const { getByRole, getByText, findByRole } = setupWithLoggedInUser(
      <DiscussionExample />
    );

    await userEvent.type(getByRole('textbox'), commentExample);

    userEvent.click(await findByRole('button', { name: 'Send comment' }));
    await waitFor(() => {
      expect(getByText(commentExample)).toBeInTheDocument();
      expect(getByText(USER_CONFIG.NAME)).toBeInTheDocument();
    });
  });
});
