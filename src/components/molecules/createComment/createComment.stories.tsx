import { expect, jest } from '@storybook/jest';
import React from 'react';
import { action } from '@storybook/addon-actions';
import { Provider } from 'react-redux';
import { userEvent, within } from '@storybook/testing-library';
import store from '../../../store';
import CreateComment from './CreateComment';

const CreateCommentTemplate = (args) => (
  <Provider store={store}>
    <CreateComment {...args} />
  </Provider>
);

export const CreateCommentExample = CreateCommentTemplate.bind({});
CreateCommentExample.args = {
  articleId: '1',
  setComments: () => action('Comment was created!'),
};

export const CannotCreateComment = CreateCommentTemplate.bind({});
CannotCreateComment.args = CreateCommentExample.args;
CannotCreateComment.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const textbox = canvas.getByRole('textbox');
  await userEvent.click(textbox);
  const button = await canvas.findByRole('button');
  setTimeout(async () => {
    await userEvent.click(button);
    expect(
      canvas.getByText(
        '* Comment is empty or too short. Min. length of the text should be 25 characters.'
      )
    ).toBeInTheDocument();
  }, 500);
};

export const CanCreateComment = CreateCommentTemplate.bind({});
CanCreateComment.args = CreateCommentExample.args;
CanCreateComment.play = async ({ canvasElement, args }) => {
  const canvas = within(canvasElement);
  const textbox = canvas.getByRole('textbox');
  await userEvent.type(textbox, 'This is a longer and more awesome comment!');
  await userEvent.click(textbox);
  const button = await canvas.findByRole('button');
  setTimeout(async () => {
    await userEvent.click(button);
    expect(args.setComments).toHaveBeenCalled();
  }, 500);
};

export const CommentTooLong = CreateCommentTemplate.bind({});
const tooLongComment =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non enim minima velit molestiae voluptates deserunt aut perferendis aliquid? Ab sequi nesciunt possimus reprehenderit dolorum rerum assumenda consequuntur repellat quod aliquid! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos fugit, enim nulla commodi adipisci, beatae officia repudiandae esse ab obcaecati fugiat laborum deserunt numquam praesentium ex rerum sequi expedita unde.';
CommentTooLong.args = CreateCommentExample.args;
CommentTooLong.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const textbox = canvas.getByRole('textbox');
  await userEvent.type(textbox, tooLongComment);
  await userEvent.click(textbox);
  const button = await canvas.findByRole('button');
  setTimeout(async () => {
    await userEvent.click(button);
    expect(
      canvas.getByText('* Comment is too long. Maximum is 250 characters.')
    ).toBeInTheDocument();
  }, 500);
};

export default {
  title: 'Molecules/Create comment',
  component: CreateComment,
};
