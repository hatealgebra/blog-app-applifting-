import React from 'react';
import StyledButton from './button.styled';

export interface ButtonProps {
  colortheme?: 'primary' | 'secondary';
  variant?: 'standard' | 'outline' | 'block';
  onClick?: (e?: React.MouseEvent<HTMLElement> | MouseEvent) => void;
  children: any;
  size?: 'sm' | 'md' | 'lg';
  isBlock?: boolean;
  type?: 'submit' | 'button';
}

const Button = ({
  variant = 'standard',
  size = 'md',
  colortheme = 'primary',
  children,
  isBlock,
  type = 'button',
  onClick,
}: ButtonProps) => {
  return (
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
};

export default Button;
