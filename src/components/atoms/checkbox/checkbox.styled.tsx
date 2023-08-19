import styled from 'styled-components';

const StyledCheckbox = styled.input`
  width: 13px;
  height: 13px;
  border-radius: 2px;
`;

export const StyledCheckboxContainer = styled.div<{ isDisabled?: boolean }>`
  display: flex;
  gap: 5px;
  align-items: center;
  cursor: ${({ isDisabled }) => (isDisabled ? 'not-allowed' : 'pointer')};
  span {
    font-weight: 300;
    font-size: ${({ theme }) => theme.typography.size.label};
    opacity: ${({ isDisabled }) => isDisabled && '.8'};
  }
`;

export default StyledCheckbox;
