import React from 'react';
import relatedArticlesJSON from '@mocks/asyncData/get/allArticlesResponse.mock.json';
import RelatedArticles from './RelatedArticles';

const Template = (args) => <RelatedArticles {...args} />;

export const NoArticlesSection = Template.bind({});

export const RelatedArticlesSection = Template.bind({});
RelatedArticlesSection.args = {
  articles: relatedArticlesJSON.items,
};

export default {
  title: 'Organisms/Related Articles section',
  component: RelatedArticles,
};
