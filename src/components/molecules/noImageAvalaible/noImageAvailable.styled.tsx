import styled from 'styled-components';

const StyledNoImageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  place-content: center;
  box-shadow: ${({ theme }) => theme.shadow.border_shadow};
  background-color: #6fbaec;

  * {
    margin: auto;
  }
`;

export default StyledNoImageContainer;
