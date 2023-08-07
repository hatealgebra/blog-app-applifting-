import React from "react";
import { components } from "../../../types/declarations";
import { ReadArticleContainer, ReadArticleContent } from "./readArticle.styled";

import ReactMarkdown from "react-markdown";

// TODO: Render image from the fetched image

const ReadArticle = ({
  title,
  imageSrc,
  author,
  createdAt,
  content,
}: components["schemas"]["ArticleDetail"] & {
  author: string;
  imageSrc: string;
}) => {
  const articlePublishedFormat = new Date(createdAt!)
    .toLocaleString()
    .split(" ")
    .slice(0, -1)
    .join(" ");
  return (
    <ReadArticleContainer className="read-article">
      <h1>{title}</h1>
      <div className="read-article__base-info label">
        <span className="read-article__author">{author}</span>
        <span>•</span>
        <span className="read-article__date">{articlePublishedFormat}</span>
      </div>
      <img src={imageSrc} alt={`${title} image`} />
      <ReadArticleContent className="read-article__markdown">
        <ReactMarkdown children={content!} />
      </ReadArticleContent>
    </ReadArticleContainer>
  );
};

export default ReadArticle;
