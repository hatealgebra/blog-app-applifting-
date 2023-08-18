import React, { Dispatch, DispatchWithoutAction } from 'react';
import { StyledTextInput, TSize } from '../../atoms/input/input.styled';

import { StyledInputWithLabel } from './inputWithLabel.styled';

const InputWithLabel = ({
  label,
  value,
  onChange,
  type,
  placeholder,
  ...props
}: InputWithLabelProps) => {
  return (
    <StyledInputWithLabel>
      <label htmlFor={label}>{label}</label>
      <StyledTextInput
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        id={label}
      />
    </StyledInputWithLabel>
  );
};

type TTypeInput = 'text' | 'password' | 'email';

export interface InputWithLabelProps {
  type?: TTypeInput;
  size?: TSize;
  placeholder?: string;
  value: any;
  onChange: Dispatch<any>;
  label: string;
}

export default InputWithLabel;
