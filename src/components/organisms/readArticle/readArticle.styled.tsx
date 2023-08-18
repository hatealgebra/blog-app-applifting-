import styled from 'styled-components';

export const ReadArticleContent = styled.div``;

export const ReadArticleContainer = styled.article`
  display: grid;
  border-bottom: 1px solid ${({ theme }) => theme.color.mono200};

  img {
    width: 100%;
    height: 60vh;
    max-height: 550px;
    object-fit: cover;
    margin-top: 10px;
  }

  .read-article {
    &__base-info {
      display: flex;
      gap: 10px;
      text-transform: capitalize;
    }
    &__markdown {
      padding: 10px 0;
      p {
        line-height: 1.6em;
        font-size: 100%;

        ${({ theme }) => theme.breakpoint.laptop} {
          font-size: 110%;
        }
      }
    }
  }
`;
