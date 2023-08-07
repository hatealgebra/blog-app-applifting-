import React from "react";
import { components } from "../../../types/declarations";
import ArticlePreviewSmall from "../../molecules/articlePreview/ArticlePreviewSmall";
import { RelatedArticlesContainer } from "./relatedArticles.styled";

const RelatedArticles = ({ articles }: RelatedArticlesProps) => {
  return (
    <RelatedArticlesContainer className="related-articles">
      <h3>Related Articles</h3>
      <div className="related-articles__articles">
        {articles && articles.length !== 0
          ? articles.map((article) => (
              <ArticlePreviewSmall
                key={article.articleId}
                articleId={article.articleId!}
                heading={article.title!}
              >
                {article.perex!}
              </ArticlePreviewSmall>
            ))
          : "No articles to show"}
      </div>
    </RelatedArticlesContainer>
  );
};

interface RelatedArticlesProps {
  articles: components["schemas"]["Article"][] | null;
}

export default RelatedArticles;
