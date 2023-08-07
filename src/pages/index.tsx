import { PageProps } from 'gatsby';
import React from 'react';
import ArticleFeed from '../components/organisms/articleFeed/ArticleFeed';
import PageTemplate from '../components/templates/Page.template';

const RecentArticles = ({ pageContext }: PageProps) => {
  console.log(pageContext);
  const { nodes } = pageContext.articles.data.allPosts;
  return (
    <PageTemplate>
      <ArticleFeed items={nodes} isLoading="idle" />
    </PageTemplate>
  );
};

export default RecentArticles;
