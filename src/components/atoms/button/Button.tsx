import React from 'react';
import StyledButton from './button.styled';
import { ButtonProps } from './button.types';

const Button = ({
  variant = 'standard',
  size = 'md',
  colortheme = 'primary',
  children,
  isBlock,
  type = 'button',
  onClick,
}: ButtonProps) => (
  <StyledButton
    onClick={onClick}
    variant={variant}
    size={size}
    colortheme={colortheme}
    isBlock={isBlock}
    type={type}
  >
    {children}
  </StyledButton>
);

export default Button;
