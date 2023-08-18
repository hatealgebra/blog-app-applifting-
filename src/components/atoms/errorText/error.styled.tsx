import styled from 'styled-components';

export const ErrorText = styled.span`
    ${({ theme }) => `
        color: ${theme.color.danger};
        font-size: ${theme.typography.size.label};
    `}}
position: relative;
top: 5px;
`;
