import styled, { css } from 'styled-components';

// TODO: Unite all forms in the same directory
const formBaseStyling = css`
  display: grid;
  flex-direction: column;
  gap: 20px;
  padding: 30px;
  width: 100%;
  max-width: 368px;
  box-shadow: ${({ theme }) => theme.shadow.form};
  radius: 4px;
  h3 {
    margin: 0.2em 0;
  }
  h3,
  div {
    grid-column: 1/3;
  }
  button {
    justify-self: flex-end;
    grid-column: 2/3;
  }
  .error {
    grid-column: 1/2;
  }
`;

const StyledLoginForm = styled.form`
  ${formBaseStyling};
`;

export default StyledLoginForm;
