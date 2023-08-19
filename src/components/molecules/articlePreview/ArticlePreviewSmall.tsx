import React from 'react';
import {
  createArticleLink,
  cutTextWithElipsis,
} from '../../../utils/generic.utils';
import { StyledArticlePreviewSmall } from './articlePreview.styled';

const ArticlePreviewSmall = ({
  heading,
  children,
  articleId,
}: ArticlePreviewSmallProps) => {
  return (
    <StyledArticlePreviewSmall to={createArticleLink(articleId)}>
      <h5>{heading}</h5>
      <p>{cutTextWithElipsis(children, 220)}</p>
    </StyledArticlePreviewSmall>
  );
};

interface ArticlePreviewSmallProps {
  heading: string;
  children: string;
  articleId: string;
}

export default ArticlePreviewSmall;
