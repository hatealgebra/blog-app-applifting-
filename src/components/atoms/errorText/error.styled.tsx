import styled from 'styled-components';

const ErrorText = styled.span`
  ${({ theme }) => `
        color: ${theme.color.danger};
        font-size: ${theme.typography.size.label};
    `}
  position: relative;
  top: 5px;
`;

export default ErrorText;
