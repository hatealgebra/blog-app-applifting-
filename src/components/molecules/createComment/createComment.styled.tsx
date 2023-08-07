import React from "react";
import styled from "styled-components";

export const StyledCreateCommentForm = styled.form`
  display: grid;
  column-gap: 20px;
  row-gap: 10px;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto;
  max-width: 600px;

  button {
    justify-self: flex-end;
    grid-column: 2/3;
  }

  img {
    display: none;
  }

  textarea {
    grid-column: 1/3;
    &:disabled {
      cursor: not-allowed;
    }
  }
  span {
    grid-row: 3/4;
    grid-column: 1/3;
    color: ${({ theme }) => theme.color.danger};
    max-width: 400px;
  }
  ${({ theme }) => `${theme.breakpoint.tablet} { 
  grid-template-columns: auto 1fr;
  textarea{
    grid-column: 2/3;
  }
  img {
    display: block;
  }
  span{
    grid-column: 2/3;
  }
   } `}
`;
