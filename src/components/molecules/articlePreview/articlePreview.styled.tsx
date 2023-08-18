import styled from 'styled-components';
import { Link } from 'gatsby';

const StyledArticlePreviewContainer = styled.article`
  display: flex;
  flex-direction: column;
  max-width: 700px;

  .article-preview {
    &__heading {
      margin: 15px 0;
    }
    &__img {
      object-fit: cover;
    }
  }

  ${({ theme }) => `${theme.breakpoint.tablet} {
        display: grid;
    grid-template-columns: 272px auto;
    grid-template-rows: repeat(4,auto);
    grid-column-gap: 20px;

    
    .article-preview{
        &__img{
            grid-column: 1/2;
            grid-row: 1/6;
            height: 244px;
        }
        &__title {
          margin: 0 0 10px 0;
          grid-column: 2/4;
        }
        &__heading, &__row-one, &__row-two, &__text {
            grid-column: 2/3;
        }
    }

    }`}
`;

export const StyledArticlePreviewImage = styled.img`
  box-shadow: ${({ theme }) => theme.shadow.border_shadow};
  width: 100%;
  object-fit: cover;
  height: 100%;
`;

export const StyledArticleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: ${({ theme }) => theme.typography.size.label};
  color: ${({ theme }) => theme.color.secondary};
`;

export const StyledArticlePreviewSmall = styled(Link)`
  max-width: 600px;
  text-decoration: none;
  color: ${({ theme }) => theme.color.black};
  h5 {
    margin: 0;
  }
  p {
    font-size: ${({ theme }) => theme.typography.size.label};
  }

  &:hover {
    text-decoration: underline;
  }
`;

export default StyledArticlePreviewContainer;
