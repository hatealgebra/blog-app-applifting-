import styled, { css } from 'styled-components';

const inputStyling = css`
  width: 100%;
  border: ${({ theme }) => `1px solid ${theme.color.border}`};
  background: white;
  border-radius: 4px;
  font-size: ${({ theme }) => theme.typography.size.h5};
  padding: 0 5px 0 10px;
  &::placeholder {
    color: ${({ theme }) => theme.color.text_muted};
    font-weight: 300;
  }
`;
export const StyledTextInput = styled.input<{ size?: TSize }>`
  ${inputStyling};
  line-height: ${({ size }) => (size === 'big' ? '46px' : '36px')};
`;
export const StyledTextArea = styled.textarea`
  ${inputStyling};
  padding: 10px;
  resize: none;
`;

export type TSize = 'big' | 'normal';
