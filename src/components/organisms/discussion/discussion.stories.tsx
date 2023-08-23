import { expect } from '@storybook/jest';
import React from 'react';
import { Provider } from 'react-redux';

import allArticlesMockJSON from '@mocks/asyncData/get/articlesDetailsResponse.mock.json';
import mockStore from '@mocks/store.mock';

import { userEvent, within } from '@storybook/testing-library';
import Discussion from './Discussion';

const Template = () => {
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

export const DiscussionExample = Template.bind({});

export const AddedComment = Template.bind({});
AddedComment.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const textbox = canvas.getByRole('textbox');
  await userEvent.click(textbox);
  await userEvent.type(textbox, 'This is a longer and more awesome comment!');
  const sendCommentBtn = await canvas.findByRole('button', {
    name: 'Send Comment',
  });
  await userEvent.click(sendCommentBtn);
  setTimeout(() => {
    expect(canvas.getAllByRole('button', { name: 'vote-up' })).toHaveLength(5);
  }, 500);
};

export default {
  title: 'Organisms/Discussion',
  component: Discussion,
};
