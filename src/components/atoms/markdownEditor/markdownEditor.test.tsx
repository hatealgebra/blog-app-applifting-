import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';

import { setupTest } from '../../../utils/testing.utils';
import { MarkDownEditorExample } from './markdownEditor.stories';

//  TODO: Write test for markdown editor with correct value check
describe('Markdown interactivity', () => {
  test('Typing text', async () => {
    const { getByRole } = setupTest(<MarkDownEditorExample />);
    userEvent.type(getByRole('textbox'), 'Testing!');
  });
});
