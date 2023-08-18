import React, { Dispatch } from 'react';
import StyledCheckbox, { StyledCheckboxContainer } from './checkbox.styled';

const Checkbox = ({
  isChecked,
  onChange,
  children,
  isDisabled,
}: CheckboxProps) => {
  return (
    <StyledCheckboxContainer isDisabled={isDisabled}>
      <StyledCheckbox
        disabled={isDisabled}
        onChange={onChange}
        checked={isChecked}
        type="checkbox"
      />
      {children && <span>{children}</span>}
    </StyledCheckboxContainer>
  );
};
export interface CheckboxProps {
  isChecked: boolean;
  onChange: any;
  children?: string;
  isDisabled?: boolean;
}

export default Checkbox;
