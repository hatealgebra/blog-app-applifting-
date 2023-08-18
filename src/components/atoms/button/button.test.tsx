import React from 'react';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/react';

import { setupTest } from '../../../utils/testing.utils';
import Button from './Button';

describe('interactivity of button', () => {
  test('call function on normal button', async () => {
    const mockFn = jest.fn();
    const { getByRole } = setupTest(<Button onClick={mockFn}>Button</Button>);
    userEvent.click(getByRole('button'));
    await waitFor(() => expect(mockFn).toHaveBeenCalled());
  });
});
