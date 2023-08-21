import React from 'react';
import { Provider } from 'react-redux';

import allArticlesMockJSON from '@mocks/asyncData/get/articlesDetailsResponse.mock.json';
import mockStore from '@mocks/store.mock';
import { userEvent, within } from '@storybook/testing-library';
import { CanCreateComment } from '@molecules/createComment/createComment.stories';
import Discussion from './Discussion';

export const DiscussionExample = () => {
  const { comments } = allArticlesMockJSON.items[4];
  return (
    <Provider store={mockStore}>
      <Discussion
        articleId="234u1890rjf189hj891j4891j43"
        commentsArray={comments}
      />
    </Provider>
  );
};
DiscussionExample.play = async (context) => {
  const canvas = within(context.canvasElement);
  await CanCreateComment.play(context);
};

export default {
  title: 'Organisms/Discussion',
  component: Discussion,
};
