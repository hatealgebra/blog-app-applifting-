import React from 'react';

import { GoPrimitiveDot } from '@react-icons/all-files/go/GoPrimitiveDot';
import { Components } from '@customTypes/declarations';
import StyledLink from '@atoms/links/link.styled';
import { getDate } from '@utils/date.utils';
import StyledArticlePreviewContainer, {
  StyledArticlePreviewImage,
  StyledArticleRow,
} from './articlePreview.styled';

import {
  createArticleLink,
  cutTextWithElipsis,
} from '../../../utils/generic.utils';
import NoImageAvailable from '../noImageAvalaible/NoImageAvailable';

// TODO: Implement fallback image
const ArticlePreview = ({
  articleId,
  title,
  createdAt,
  perex,
  comments,
  imageBase64,
  author,
}: Components['schemas']['ArticleDetail'] & {
  author: string;
  imageBase64: String;
}) => {
  const [fallbackImage, setFallbackImage] = React.useState(false);
  const createdDate = getDate(createdAt);
  const file = `data:image/png;base64,${imageBase64}`;

  const decideOnImage = (currentTarget: HTMLImageElement) => {
    if (!currentTarget) return;
    // eslint-disable-next-line no-param-reassign
    currentTarget.onerror! = null;
    setFallbackImage(true);
  };

  return (
    <StyledArticlePreviewContainer className="article-preview">
      {fallbackImage ? (
        <NoImageAvailable />
      ) : (
        <StyledArticlePreviewImage
          className="article-preview__img"
          src={file}
          alt={`${title} preview image`}
          onError={({ currentTarget }) => decideOnImage(currentTarget)}
        />
      )}
      <h3 className="article-preview__title">
        {cutTextWithElipsis(title, 50)}
      </h3>
      <StyledArticleRow className="article-preview__row-one">
        <span>{author ?? 'Unknown author'}</span>
        <GoPrimitiveDot />
        <span>{createdDate}</span>
      </StyledArticleRow>
      <p className="article-preview__text">{perex}</p>
      <StyledArticleRow className="article-preview__row-two">
        <StyledLink to={createArticleLink(articleId)}>
          Read whole article
        </StyledLink>
        <span>{`${comments?.length || '0'} comments`}</span>
      </StyledArticleRow>
    </StyledArticlePreviewContainer>
  );
};

export default ArticlePreview;
