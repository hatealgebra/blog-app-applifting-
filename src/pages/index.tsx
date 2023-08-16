import { PageProps, graphql, useStaticQuery } from 'gatsby';
import React, { useEffect, useState } from 'react';
import ArticleFeed from '../components/organisms/articleFeed/ArticleFeed';
import PageTemplate from '../components/templates/Page.template';

const RecentArticles = () => {
  return (
    <PageTemplate>
      <ArticleFeed />
    </PageTemplate>
  );
};

export default RecentArticles;
