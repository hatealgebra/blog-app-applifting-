import React from 'react';
import ArticleFeed from './ArticleFeed';
import allArticlesDetailMockJSON from '../../../__mocks__/asyncData/get/articlesDetailsResponse.mock.json';

export const ArticleFeedLoading = () => (
  <ArticleFeed items={allArticlesDetailMockJSON.items} />
);

export const ArticleFeedEmpty = () => <ArticleFeed items={[]} />;

export default {
  title: 'Organisms/Article Feed',
  component: ArticleFeed,
};
