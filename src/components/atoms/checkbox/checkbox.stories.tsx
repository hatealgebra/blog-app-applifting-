import { expect } from '@storybook/jest';
import { action } from '@storybook/addon-actions';
import React from 'react';
import { userEvent, within } from '@storybook/testing-library';
import Checkbox from './Checkbox';

const setCheck = () => action('Clicked!');

const CheckboxTemplate = (args) => <Checkbox {...args} />;

export const CheckedCheckbox = CheckboxTemplate.bind({});
CheckedCheckbox.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const checkbox = canvas.getByRole('checkbox');
  await userEvent.click(checkbox);
  expect(checkbox).toBeChecked();
};

export const AllVariants = () => {
  return (
    <>
      <Checkbox isChecked={false} onChange={setCheck} />

      <Checkbox isDisabled isChecked={true} onChange={setCheck} />
      <Checkbox isChecked={false} onChange={setCheck}>
        Checkbox with label
      </Checkbox>
      <Checkbox isDisabled isChecked={false} onChange={setCheck}>
        Checkbox with label
      </Checkbox>
    </>
  );
};

export default {
  component: Checkbox,
  title: 'Atoms/Checkbox',
};
