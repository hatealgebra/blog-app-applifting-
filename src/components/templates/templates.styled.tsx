import styled, { css } from 'styled-components';

const PageTemplateBaseStyling = css`
  height: 100%;
  width: 100%;
  margin: 15px auto;
`;

export const FormContainerTemplate = styled.div`
  display: grid;
  place-content: center;
  ${PageTemplateBaseStyling};
`;

export const NonFormPageContainer = styled.div<{ isArticle?: boolean }>`
  max-width: 1000px;
  height: 100%;
  width: 100%;
  ${PageTemplateBaseStyling};

  ${({ theme }) => theme.breakpoint.laptop} {
    ${({ isArticle }) =>
      isArticle ? 'margin: 15px auto;' : 'margin: 40px auto;'}
  }
`;

export const StyledArticlePageContainer = styled.div`
  display: grid;
  max-width: 1200px;
  row-gap: 20px;
  grid-template-columns: 1fr;

  ${({ theme }) => theme.breakpoint.laptop} {
    column-gap: 30px;
    grid:
      'article related'
      'article .'
      'discussion discussion' / auto auto auto/ 3fr 1fr;

    .read-article {
      grid-area: article;
    }

    .related-articles {
      grid-area: related;
      margin-top: 50px;
    }

    .discussion {
      margin-top: 30px;
      grid-area: discussion;
    }
  }

  ${({ theme }) => theme.breakpoint.desktop} {
    grid-template-columns: 2fr 1fr;
  }
`;

export const StyledPageTemplate = styled.div`
  padding: 15px;
  padding-bottom: 50px;

  ${({ theme }) => theme.breakpoint.tablet} {
    padding: 15px 5%;
  }
`;
