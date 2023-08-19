import React from 'react';
import { TCompleteArticles } from 'customTypes/schema';

import { Components } from '@customTypes/declarations';
import ArticlePreview from '../../molecules/articlePreview/ArticlePreview';
import {
  ArticlesContainer,
  CenterContainer,
  StyledArticleFeed,
} from './articleFeed.styled';

interface ArticleFeedProps {
  items: TCompleteArticles;
}

const ArticleFeed = ({ items }: ArticleFeedProps) => {
  return (
    <StyledArticleFeed className="article-feed">
      <h1 className="article-feed__heading">Recent articles</h1>
      <div className="article-feed__articles">
        {items === undefined || !items.length ? (
          <CenterContainer>
            <h3>No Articles to show</h3>
          </CenterContainer>
        ) : (
          <ArticlesContainer>
            {items.map(
              ({
                articleId,
                title,
                perex,
                createdAt,
                imageId,
                imageBase64,
                comments,
              }: Components['schemas']['Article'] &
                Components['schemas']['ArticleDetail'] & {
                  imageBase64: 'string';
                }) => (
                <ArticlePreview
                  key={articleId}
                  articleId={articleId}
                  title={title}
                  perex={perex}
                  createdAt={createdAt}
                  imageId={imageId}
                  comments={comments}
                  imageBase64={imageBase64}
                  author="Unknow author"
                />
              )
            )}
          </ArticlesContainer>
        )}
      </div>
    </StyledArticleFeed>
  );
};

export default ArticleFeed;
