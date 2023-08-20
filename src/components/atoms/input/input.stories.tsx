import React from 'react';

import { userEvent, within } from '@storybook/testing-library';

import { expect } from '@storybook/jest';
import { Story } from '@storybook/react';

import { StyledTextArea, StyledTextInput } from './input.styled';

const Template = (args) => <StyledTextInput {...args} />;

export const InputAllSize = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
    <StyledTextInput placeholder="This is normal input" />
    <StyledTextInput size="big" placeholder="This is big input" />
  </div>
);

export const InputTextVariants = () => (
  <>
    <StyledTextInput type="text" placeholder="Plain text input" />
    <StyledTextInput type="password" placeholder="Plain password input" />
    <StyledTextInput type="email" placeholder="Plain email input" />
    <StyledTextArea rows={1} placeholder="Join the discussion" />
  </>
);

export const FocusedExample = Template.bind({});
FocusedExample.args = {
  placeholder: 'This is a placeholder',
  size: 'big',
};

FocusedExample.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const input = canvas.getByRole('textbox');
  input.focus();
  await expect(input).toHaveFocus();
};

export const InputWValue = Template.bind({});
InputWValue.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const input = canvas.getByRole('textbox');
  await userEvent.type(input, 'This is a new comment!');
  await expect(input).toHaveValue('This is a new comment!');
};

export const TextAreaWInput = () => <StyledTextArea />;
TextAreaWInput.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const input = canvas.getByRole('textbox');
  await userEvent.type(input, 'This is a new comment!');
  await expect(input).toHaveValue('This is a new comment!');
};

export default {
  title: 'Atoms/Input',
  component: StyledTextInput,
  subcomponents: { StyledTextArea },
  decorators: [
    (StoryComponent: Story) => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        <StoryComponent />
      </div>
    ),
  ],
};
