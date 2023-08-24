import styled from 'styled-components';
import { ButtonProps } from '@atoms/button/button.types';
import Button from '@atoms/button/Button';

export const StyledMinimalButton = styled(Button).attrs<ButtonProps>(() => ({
  variant: 'outline',
  size: 'sm',
}))<ButtonProps>`
  /* stylelint-disable */
  /* stylelint-enable */
`;

export const StyledUploadImage = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;

  .upload-image {
    button,
    &__preview {
      width: 112px;
      height: 74px;
    }

    &__button-row {
      display: flex;

      button {
        border: none;
        border-radius: 0;
      }

      button:nth-of-type(1) {
        color: ${({ theme }) => theme.color.primary};
        padding-left: 0;
        border-right: 2px solid ${({ theme }) => theme.color.border};
      }

      button:nth-of-type(2) {
        color: ${({ theme }) => theme.color.danger};
      }
    }
  }
`;
