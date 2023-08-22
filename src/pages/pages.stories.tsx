import React from 'react';

import ArticlePage from '@templates/ArticlePage.template';
import articleDetailResponseMockJSON from '@mocks/asyncData/get/articlesDetailsResponse.mock.json';

const pageContext = {
  article: articleDetailResponseMockJSON.items[0],
};

export const ArticleReadPage = () => <ArticlePage pageContext={pageContext} />;

export default {
  title: 'Pages/Articles pages',
  subcomponent: {},
};
