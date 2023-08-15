import React from 'react';
import { components } from '../../../types/declarations';
import Loading from '../../atoms/loadingIcon/Loading';
import ArticlePreview from '../../molecules/articlePreview/ArticlePreview';
import {
  ArticlesContainer,
  CenterContainer,
  StyledArticleFeed,
} from './articleFeed.styled';

const ArticleFeed = ({
  isLoading,
  items,
}: components['schemas']['ArticleList'] & {
  isLoading: 'loading' | 'idle';
}) => {
  return (
    <StyledArticleFeed className="article-feed">
      <h1 className="article-feed__heading">Recent articles</h1>
      <div className="article-feed__articles">
        {isLoading === 'loading' ? (
          <CenterContainer>
            <Loading />
          </CenterContainer>
        ) : items === undefined ? (
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
              }: components['schemas']['Article'] &
                components['schemas']['ArticleDetail'] & {
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
