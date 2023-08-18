import styled from 'styled-components';

const StyledMyArticlesHeading = styled.div`
  display: flex;
  flex-direction: column;

  a {
    margin-left: 5px;
  }

  ${({ theme }) => theme.breakpoint.tablet} {
    flex-direction: row;
    align-items: center;
    gap: 20px;

    a {
      margin-left: 0;
    }
  }
`;

export default StyledMyArticlesHeading;
