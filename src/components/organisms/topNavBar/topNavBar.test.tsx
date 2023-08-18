import React from 'react';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/react';
import { setupTestWithStore } from '../../../utils/testing.utils';
import { MobileNavBar } from './topnavBar.stories';

//  TODO write complete tests
describe('interactivity of top navbar', () => {
  test('open mobile menu', async () => {
    const { getAllByRole, getByTestId } = setupTestWithStore(<MobileNavBar />);
    userEvent.click(getAllByRole('button')[0]);
    await waitFor(() =>
      expect(getByTestId('mobileMenu')).toHaveStyle('height: 100%')
    );
  });
});
