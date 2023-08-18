import React, { Dispatch } from 'react';
import { AnyAction } from '@reduxjs/toolkit';
import { components } from '../../../customTypes/declarations';
import Checkbox from '../../atoms/checkbox/Checkbox';
import { StyledEditArticleRow } from './editArticleRow.styled';

import ButtonSort from '../../atoms/button/ButtonSort';
import { sortMyArticles } from '../../../store/slices/admin.slices';
import { deleteArticleThunk } from '../../../store/thunks/admin.thunks';

interface EditArticleRowButtonsProp {
  originalArray: components['schemas']['Article'];
  switchAllBoxes: React.SetStateAction<any>;
  dispatch: React.Dispatch<AnyAction>;
}

const EditArticleRowButtons = ({
  originalArray,
  switchAllBoxes,
  dispatch,
}: EditArticleRowButtonsProp) => {
  const { BY_TITLE, BY_AUTHOR, BY_NR_COMMENTS, BY_PEREX, ORIGINAL } =
    ESortByOptions;
  const [isChecked, setIsChecked] = React.useState(false);
  const [isActive, setIsActive] = React.useState<ESortByOptions>(ORIGINAL);

  const activeSort = (sortType: ESortByOptions) => {
    setIsActive((prev) => {
      if (prev === sortType) {
        dispatch(sortMyArticles(ORIGINAL));
        return ORIGINAL;
      }
      dispatch(sortMyArticles(sortType));
      return sortType;
    });
  };

  React.useEffect(() => {
    switchAllBoxes(isChecked);
  }, [isChecked]);

  React.useEffect(() => {
    dispatch({ type: 'admin/sortMyArticles', payload: isActive });
  }, [originalArray]);

  return (
    <StyledEditArticleRow className="edit-article">
      <th className="edit-article__checkbox">
        <Checkbox
          isChecked={isChecked}
          onChange={() => setIsChecked((prev) => !prev)}
        />
      </th>
      <th className="edit-article__title">
        <ButtonSort
          isActive={isActive === BY_TITLE}
          onClick={() => activeSort(BY_TITLE)}
        >
          Article title
        </ButtonSort>
      </th>
      <th className="edit-article__perex">
        <ButtonSort
          isActive={isActive === BY_PEREX}
          onClick={() => activeSort(BY_PEREX)}
        >
          Perex
        </ButtonSort>
      </th>
      <th className="edit-article__author">
        <ButtonSort
          isActive={isActive === BY_AUTHOR}
          onClick={() => activeSort(BY_AUTHOR)}
        >
          Author
        </ButtonSort>
      </th>
      <th className="edit-article__nr-comments">
        <ButtonSort
          isActive={isActive === BY_NR_COMMENTS}
          onClick={() => activeSort(BY_NR_COMMENTS)}
        >
          # comments
        </ButtonSort>
      </th>
      <th className="edit-article__actions-container">Actions</th>
    </StyledEditArticleRow>
  );
};

export enum ESortByOptions {
  ORIGINAL = 'original',
  BY_TITLE = 'title',
  BY_PEREX = 'perex',
  BY_AUTHOR = 'author',
  BY_NR_COMMENTS = 'comments',
}

export default EditArticleRowButtons;
