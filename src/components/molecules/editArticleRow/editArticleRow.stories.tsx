import React from 'react';
import { jest } from '@storybook/jest';

import EditArticleRow from './EditArticleRow';
import EditArticleRowButtons from './EditArticleRowButtons';

import articlesDetailMockJSON from '../../../__mocks__/asyncData/get/articlesDetailsResponse.mock.json';

const { title, perex } = articlesDetailMockJSON.items[0];

// FIX: These two components
const EditArticleRowTemplate = (args: any) => <EditArticleRow {...args} />;

export const EditArticleRowExample = EditArticleRowTemplate.bind({});
EditArticleRowExample.args = {
  iteration: 0,
  title,
  perex,
  editArticle: jest.fn(),
  deleteArticle: jest.fn(),
  isChecked: true,
  setCheckedBoxes: jest.fn(),
};

const ArticleRowHeaderTemplate = (args: any) => (
  <EditArticleRowButtons {...args} />
);

export const ArticleRowHeaderExample = ArticleRowHeaderTemplate.bind({});
ArticleRowHeaderExample.args = {
  originalArray: articlesDetailMockJSON.items,
  dispatch: jest.fn(),
  switchAllBoxes: jest.fn(),
};

export default {
  title: 'Molecules/Edit Article',
  component: EditArticleRow,
  subcomponents: { EditArticleRowButtons },
};
