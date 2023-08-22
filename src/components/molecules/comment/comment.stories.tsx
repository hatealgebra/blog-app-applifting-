import React from 'react';
import { Components } from '@customTypes/declarations';
import { userEvent, within } from '@storybook/testing-library';

import Comment from './Comment';

const CommentTemplate = (args: Components['schemas']['Comment']) => (
  <Comment
    {...args}
    articleId="hello world"
    author="Linda Lynn"
    score={0}
    postedAt="2020-10-01T19:44:11.577668"
    content="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus quibusdam qui autem libero consequuntur tenetur eveniet recusandae aliquam obcaecati.Consequatur perferendis id, dolorem quae unde recusandae ad delenitiobcaecati similique?"
  />
);

export const CommentExample = CommentTemplate.bind({});
CommentExample.args = {
  articleId: 'hello world',
  author: 'Linda Lynn',
  score: 0,
  postedAt: '2020-10-01T19:44:11.577668',
  content:
    'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus quibusdam qui autem libero consequuntur tenetur eveniet recusandae aliquam obcaecati.Consequatur perferendis id, dolorem quae unde recusandae ad delenitiobcaecati similique?',
};

export const CommentVotedUp = CommentTemplate.bind({});
CommentVotedUp.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const voteUpButton = canvas.getByRole('button', { name: 'vote-up' });
  await userEvent.click(voteUpButton);
};

export const CommentVoteDown = CommentTemplate.bind({});
CommentVoteDown.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const voteDownButton = canvas.getByRole('button', { name: 'vote-down' });
  await userEvent.click(voteDownButton);
};

// export const CommentAPIError = CommentTemplate.bind({});
// CommentAPIError.parameters = {
//   msw: [
//     rest.post(
//       `${BASE_API_URL}/comments/:commentId/vote/up`,
//       (req, res, ctx) => {
//         return res(ctx.status(500));
//       }
//     ),
//   ],
// };

export default {
  title: 'Molecules/Comment',
  component: Comment,
};
