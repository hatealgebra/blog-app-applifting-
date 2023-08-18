import React from 'react';
import useAllArticles from '@hooks/useAllArticles';
import ArticleFeed from '../components/organisms/articleFeed/ArticleFeed';
import PageTemplate from '../components/templates/Page.template';

// TODO: Solve pagination

const RecentArticles = () => {
  const articles = useAllArticles();
  console.log(articles);
  return (
    <PageTemplate>
      <ArticleFeed items={articles} />
    </PageTemplate>
  );
};

export default RecentArticles;
