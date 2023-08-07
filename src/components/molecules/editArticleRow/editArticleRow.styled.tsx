import styled from "styled-components";

export const StyledIconButton = styled.button`
  border: none;
  background-color: transparent;

  svg {
  }
`;

export const StyledEditArticleRow = styled.tr`
  width: 100%;
  line-height: 2.5em;
  border-bottom: 2px solid ${({ theme }) => theme.color.border};

  td,
  th {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 0;
    text-align: left;
    padding: 0 5px;
  }
  button {
    padding-left: 0px;
  }
  .edit-article {
    &__checkbox {
      width: fit-content;
    }
    &__title {
      width: 65%;
    }
    &__actions-container {
      width: fit-content;
    }
    &__perex,
    &__author,
    &__nr-comments {
      display: none;
    }

    &__actions {
      width: fit-content;
      display: flex;
      flex-basis: 30px;
    }
  }

  ${({ theme }) => theme.breakpoint.tablet} {
    td,
    th {
      padding: 10px;
    }
    .edit-article {
      &__checkbox {
        width: 5%;
      }
      &__title {
        width: 65%;
      }
      &__nr-comments {
        display: table-cell;
        width: 20%;
      }
      &__actions-container {
        width: 10%;
      }
    }
  }

  ${({ theme }) => theme.breakpoint.landscapeTablet} {
    .edit-article {
      &__title {
        width: 30%;
      }
      &__perex {
        display: table-cell;
        width: 30%;
      }

      &__author,
      &__nr-comments {
        display: table-cell;
        width: 10%;
      }
    }
  }
`;
