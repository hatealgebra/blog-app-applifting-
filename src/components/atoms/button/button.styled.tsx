import styled, { css } from 'styled-components';

import { ButtonProps, MenuButtonProps } from './button.types';

export const StyledButtonSort = styled.button<{
  isActive?: boolean;
}>`
  color: ${({ isActive, theme }) =>
    isActive ? theme.color.primary : theme.color.black};
  background-color: transparent;
  border: none;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

export const MenuButtonContainer = styled.button<MenuButtonProps>`
  display: flex;
  place-content: center;
  padding: 5px 8px;
  background: transparent;
  border: ${({ theme }) => `1.5px solid ${theme.color.mono200}`};
  border-radius: 4px;
  cursor: pointer;

  svg {
    color: ${({ theme }) => theme.color.secondary};
  }
`;

const StyledButton = styled.button<ButtonProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: ${({ isBlock }) => (isBlock ? '100%' : 'fit-content')};
  font-weight: 300;
  color: ${({ variant, colortheme, theme }) =>
    variant === 'outline' ? colortheme && theme.color[colortheme] : 'white'};
  border: 1px solid
    ${({ colortheme, theme }) => colortheme && theme.color[colortheme]};
  border-radius: 4px;
  text-transform: capitalize;
  cursor: pointer;
  background-color: ${({ colortheme, variant, theme }) =>
    variant === 'outline'
      ? 'transparent'
      : colortheme && theme.color[colortheme]};
  ${({ size, theme }) => {
    if (size === 'lg') {
      return css`
        height: 46px;
        font-size: ${theme.typography.size.h5};
        padding: 8px 16px;
      `;
    }
    if (size === 'sm') {
      return css`
        height: 28px;
        font-size: ${theme.typography.size.label};
        padding: 4px 8px;
      `;
    }
    return css`
      height: 36px;
      font-size: ${theme.typography.size.body};
      padding: 6px 12px;
    `;
  }}
`;

export default StyledButton;
