import React from 'react';

import { action } from '@storybook/addon-actions';
import EditArticleRow from './EditArticleRow';
import EditArticleRowButtons from './EditArticleRowButtons';

import articlesDetailMockJSON from '../../../__mocks__/asyncData/get/articlesDetailsResponse.mock.json';

const { title, perex } = articlesDetailMockJSON[0];

// FIX: These two components

export const ArticleRowExample = () => {
  const editArticleMock = () => action('Edit function called');
  const callDeleteMock = () => action('Delete article right');
  const setCheckedBoxes = () => action('All boxes were checked');

  return (
    <EditArticleRow
      iteration={0}
      title={title}
      perex={perex}
      editArticle={editArticleMock}
      deleteArticle={callDeleteMock}
      isChecked={true}
      setCheckedBoxes={setCheckedBoxes}
    />
  );
};

export const ArticleRowButtonsExample = () => {
  return (
    <EditArticleRowButtons
      originalArray={articlesDetailMockJSON}
      dispatch={action('Dispatch  called!')}
      switchAllBoxes={action('Switch all boxes called!')}
    />
  );
};

export default {
  title: 'Molecules/Edit article',
  component: EditArticleRow,
};
