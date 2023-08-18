import { PageProps, graphql, useStaticQuery } from 'gatsby';
import React, { useEffect, useState } from 'react';
import ArticleFeed from '../components/organisms/articleFeed/ArticleFeed';
import PageTemplate from '../components/templates/Page.template';
import useAllArticles from '@hooks/useAllArticles';

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
