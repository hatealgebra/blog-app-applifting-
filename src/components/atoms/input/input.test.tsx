import React from 'react';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/react';

import { setupTest } from '../../../utils/testing.utils';
import { InputExample } from './input.stories';

describe('input testing', () => {
  const typeValue = 'This is a new comment!';
  test('focus on input', async () => {
    const { getByRole } = setupTest(<InputExample />);
    getByRole('textbox').focus();
    expect(getByRole('textbox')).toHaveFocus();
  });
  test('change of the input value', async () => {
    const { getByRole } = setupTest(<InputExample />);
    userEvent.type(getByRole('textbox'), typeValue);
    await waitFor(() => {
      expect(getByRole('textbox')).toHaveValue(typeValue);
    });
  });
});
