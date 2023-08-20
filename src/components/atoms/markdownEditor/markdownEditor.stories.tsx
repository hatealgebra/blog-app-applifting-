import { expect } from '@storybook/jest';
import React from 'react';
import { userEvent, within } from '@storybook/testing-library';
import MarkdownEditor from './MarkdownEditor';

const MdEditorTemplate = (args) => <MarkdownEditor {...args} />;

export const MarkdownEditorEmpty = MdEditorTemplate.bind({});

export const MarkdownEditorWValue = MdEditorTemplate.bind({});
MarkdownEditorWValue.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const input = canvas.getByRole('textbox');
  await userEvent.type(input, 'New text in markdown editor');
  expect(input).toHaveValue('New text in markdown editor');
};

export default {
  title: 'Atoms/MarkdownEditor',
  component: MarkdownEditor,
};
