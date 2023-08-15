import React from 'react';
import ArticleFeed from './ArticleFeed';

import articlesJSON from '../../../__mocks__/asyncData/get/allArticlesResponse.mock.json';

export const ArticleFeedLoading = () => (
  <ArticleFeed isLoading="loading" items={[]} />
);
export const ArticleFeedEmpty = () => (
  <ArticleFeed isLoading={'idle'} items={[]} />
);
export const ArticleFeedFull = () => (
  <ArticleFeed isLoading="idle" items={articlesJSON.data} />
);

export default {
  title: 'Organisms/Article Feed',
  component: ArticleFeed,
};
