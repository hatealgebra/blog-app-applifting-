import { action } from '@storybook/addon-actions';
import React from 'react';
import Checkbox from './Checkbox';

const setCheck = () => action('Clicked!');

export const CheckboxExample = () => {
  return (
    <>
      <Checkbox isChecked={false} onChange={setCheck} />
      <Checkbox isChecked={true} onChange={setCheck} />
      <Checkbox isDisabled isChecked={false} onChange={setCheck} />
      <Checkbox isDisabled isChecked={true} onChange={setCheck} />
    </>
  );
};
export const CheckboxWithLabel = () => {
  return (
    <>
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
