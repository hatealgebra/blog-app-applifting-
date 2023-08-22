import React from 'react';
import { userEvent, within } from '@storybook/testing-library';
import MyArticlesTable from './MyArticlesTable';

// TODO: Add comments play story
// TODO: Add specific msw mocking for these stories, to show different

const Template = () => <MyArticlesTable />;

export const MyArticlesTableExample = Template.bind({});
export const MyArticleTableLoading = Template.bind({});

// export const NoArticles = () => <MyArticlesTable />;
// NoArticles.parameters = {
//   msw: {
//     handlers: [
//       rest.get(`${BASE_API_URL}/articles`, (req, res, ctx) => {
//         return res(ctx.status(200), ctx.json([]));
//       }),
//     ],
//   },
// };

export const SortByTitle = Template.bind({});
SortByTitle.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const sortBtnTitle = canvas.getByRole('button', { name: 'Article title' });
  await userEvent.click(sortBtnTitle);
};

export const SortByPerex = Template.bind({});
SortByPerex.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const SortBtnPerex = canvas.getByRole('button', { name: 'Perex' });
  await userEvent.click(SortBtnPerex);
};

export default {
  title: 'Organisms/My Articles Table',
  component: MyArticlesTable,
};
