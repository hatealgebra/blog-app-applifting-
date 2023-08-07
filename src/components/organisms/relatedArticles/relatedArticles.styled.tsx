import React from "react";
import styled from "styled-components";

export const RelatedArticlesContainer = styled.div`
  border-left: 1px solid ${({ theme }) => theme.color.mono200};
  padding: 0px 0 50px 20px;
  h3 {
  }

  .related-articles {
    &__articles {
      margin-top: 10px;
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
  }
`;
