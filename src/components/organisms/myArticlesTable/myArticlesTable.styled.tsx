import styled from 'styled-components';
import { CenterContainer } from '../articleFeed/articleFeed.styled';

export const StyledFallbackContentContainer = styled(CenterContainer)`
  position: absolute;
  min-height: 250px;
  width: 90%;
  gap: 10px;
  flex-direction: column;

  img {
    width: 250px;
  }
  span {
    font-weight: 700;
  }

  ${({ theme }) => `${theme.breakpoint.tablet}{
    flex-direction: row;
  }`}
`;

export const StyledArticlesTable = styled.table`
  table-layout: fixed;
  border-spacing: 0px 10px;
  border-collapse: collapse;
  padding: 0;
  margin: 0;
  overflow: auto;

  ${({ theme }) => theme.breakpoint.tablet} {
    border-spacing: 5px 10px;
  }

  ${({ theme }) => theme.breakpoint.tablet} {
    border-spacing: 10px 5px;
  }
`;

export const MyArticlesForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const MyArticlesTableContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
