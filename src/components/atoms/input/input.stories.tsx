import React from 'react';
import { Story } from '@storybook/react';
import { StyledTextArea, StyledTextInput } from './input.styled';

const Template = (args) => <StyledTextInput {...args} />;

export const InputExample = () => Template.bind({});
InputExample.args = {
  placeholder: 'This is a placeholder',
};
// InputExample.play = async ({ canvasElement }) => {
//   console.log(canvasElement);
// };

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
