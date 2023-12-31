import React from 'react';
import ReactMarkdown from 'react-markdown';

import { Components } from '@customTypes/declarations';
import ReadArticleContainer from './readArticle.styled';

// TODO: Render image from the fetched image

const ReadArticle = ({
  title,
  imageSrc,
  author,
  createdAt,
  content,
}: Components['schemas']['ArticleDetail'] & {
  author: string;
  imageSrc: string;
}) => {
  const articlePublishedFormat = new Date(createdAt!)
    .toLocaleString()
    .split(' ')
    .slice(0, -1)
    .join(' ');
  return (
    <ReadArticleContainer className="read-article">
      <h1>{title}</h1>
      <div className="read-article__base-info label">
        <span className="read-article__author">{author}</span>
        <span>•</span>
        <span className="read-article__date">{articlePublishedFormat}</span>
      </div>
      <img src={imageSrc} alt={`${title} image`} />
      <div className="read-article__markdown">
        <ReactMarkdown children={content!} />
      </div>
    </ReadArticleContainer>
  );
};

export default ReadArticle;
