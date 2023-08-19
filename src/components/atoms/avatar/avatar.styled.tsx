import styled, { css } from 'styled-components';
import { AvatarProps } from './Avatar';

export const StyledAvatar = styled.img<AvatarProps>`
  object-fit: cover;
  border-radius: 50%;
  ${({ size }) => {
    switch (size) {
      case 'sm':
        return css`
          height: 24px;
          width: 24px;
        `;
      case 'md':
        return css`
          height: 32px;
          width: 32px;
        `;
      case 'lg':
        return css`
          height: 44px;
          width: 44px;
        `;

      default:
        return css`
          height: 44px;
          width: 44px;
        `;
    }
  }}
`;
