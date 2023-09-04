import React from 'react';

import articlesDetailResponseMockJSON from '@mocks/asyncData/get/articlesDetailsResponse.mock.json';
import ReadArticle from './ReadArticle';

const content = `Men might grow a beard or maintain a mustache just for extra style points, but the facial hair of the cat has nothing to do with fashion. A cat's whiskers — or vibrissae — are a well-honed sensory tool that helps a catsee in the dark and steer clear of hungry predators. Whiskers
`;

export const ReadArticleExample = () => (
  <ReadArticle
    title="Why do cats have Whiskers?"
    imageSrc={`data:image/png;base64,${articlesDetailResponseMockJSON.items[0].imageBase64}`}
    author="Elizabeth whatever"
    createdAt="12.04.2019"
    content={content}
  />
);

export default {
  title: 'Organisms/Read Article',
  component: ReadArticle,
};
