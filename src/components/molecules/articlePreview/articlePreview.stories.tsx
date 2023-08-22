import React from 'react';

import { userEvent, within } from '@storybook/testing-library';
import ArticlePreview from './ArticlePreview';
import ArticlePreviewSmall from './ArticlePreviewSmall';
import articlesDetailsResponseMockJSON from '../../../__mocks__/asyncData/get/articlesDetailsResponse.mock.json';

const { comments } = articlesDetailsResponseMockJSON.items[0];

export const ArticlePreviewMobile = () => {
  return (
    <ArticlePreview
      imageBase64={''}
      title="Article heading"
      author="Random Author"
      createdAt="08/08/2021"
      perex="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro beatae quod qui id dolorum nam, sapiente rem debitis ad illo doloribus ab! Dolorem aliquam facilis labore fugit rem, dolores quasi."
      comments={comments}
    />
  );
};

export const ArticlePreviewLongTitle = () => (
  <ArticlePreview
    imageBase64={''}
    title="Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum"
    author="Random Author"
    createdAt="08/08/2021"
    perex="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro beatae quod qui id dolorum nam, sapiente rem debitis ad illo doloribus ab! Dolorem aliquam facilis labore fugit rem, dolores quasi."
    comments={comments}
  />
);

export const ArticlePreviewSmallExample = () => (
  <ArticlePreviewSmall articleId="" heading="Hello world">
    Hello there
  </ArticlePreviewSmall>
);
ArticlePreviewSmallExample.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const articlePreviewLink = canvas.getByRole('link');

  await userEvent.hover(articlePreviewLink);
};

export default {
  title: 'Molecules/Article Preview',
  component: ArticlePreview,
};
