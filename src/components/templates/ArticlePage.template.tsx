import React from 'react';
import ReadArticle from '../organisms/readArticle/ReadArticle';
import PageTemplate from './Page.template';

import RelatedArticles from '../organisms/relatedArticles/RelatedArticles';
import Discussion from '../organisms/discussion/Discussion';
import { StyledArticlePageContainer } from './templates.styled';
import { components } from '../../types/declarations';
import { graphql, useStaticQuery } from 'gatsby';

const ArticlePage = ({
  pageContext,
}: {
  pageContext: {
    article: components['schemas']['Article'] &
      components['schemas']['ArticleDetail'] & { imageBase64: string };
  };
}) => {
  const [relatedArticles, setRelatedArticles] = React.useState(null);
  const articles = useStaticQuery(graphql`
    query {
      allPosts {
        nodes {
          id
          articleId
          createdAt
          lastUpdatedAt
          imageId
          imageBase64
          title
          perex
          content
          comments
        }
      }
    }
  `);
  const { articleId, createdAt, title, imageBase64, content, comments } =
    pageContext.article;
  const commentsArray =
    typeof comments === 'string' ? JSON.parse(comments) : [];

  const getArticles = () => {};

  React.useEffect(() => {
    const showRelatedArticles = () => {
      const { nodes } = articles.allPosts;
      const articlesFiltered = nodes.filter(
        (article: components['schemas']['Article']) =>
          article.articleId !== articleId
      );

      setRelatedArticles(articlesFiltered);
    };

    showRelatedArticles();
  }, []);

  return (
    <PageTemplate isArticle>
      <StyledArticlePageContainer>
        <ReadArticle
          title={title}
          imageSrc={`data:image/png;base64,${imageBase64}`}
          author={'Pavel Vondra'}
          createdAt={createdAt}
          content={content}
          comments={comments}
        />
        <Discussion articleId={articleId!} commentsArray={commentsArray} />
        <RelatedArticles articles={relatedArticles} />
      </StyledArticlePageContainer>
    </PageTemplate>
  );
};

export default ArticlePage;
