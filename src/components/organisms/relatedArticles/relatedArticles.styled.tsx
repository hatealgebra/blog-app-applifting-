import styled from 'styled-components';

const RelatedArticlesContainer = styled.div`
  border-left: 1px solid ${({ theme }) => theme.color.mono200};
  padding: 0 0 50px 20px;

  .related-articles {
    &__articles {
      margin-top: 10px;
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
  }
`;

export default RelatedArticlesContainer;
