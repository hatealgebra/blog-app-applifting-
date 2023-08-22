import { expect } from '@storybook/jest';
import React from 'react';

import { userEvent, within } from '@storybook/testing-library';
import allArticlesDetailMockJSON from '@mocks/asyncData/get/articlesDetailsResponse.mock.json';
import { mockOriginalFile } from '@molecules/uploadImage/uploadImage.stories';
import PublishArticleForm from './PublishArticleForm';
import { EPublishArticleErrors } from './publishArticleForm.types.d';

const { title, content } = allArticlesDetailMockJSON.items[0];

const Template = (args) => <PublishArticleForm {...args} />;

export const CreateNewArticleFormExample = Template.bind({});

export const BasicValidationCheck = Template.bind({});
BasicValidationCheck.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const submitBtn = canvas.getByRole('button', { name: 'Publish article' });
  const titleInput = canvas.getByPlaceholderText('My new article');

  await userEvent.click(submitBtn);

  canvas.getAllByText(EPublishArticleErrors.TITLE_EMPTY).forEach((el) => {
    expect(el).toBeInTheDocument();
  });

  await userEvent.type(titleInput, 'Sml');
  await userEvent.click(submitBtn);

  expect(
    await canvas.findByText(EPublishArticleErrors.TITLE_LENGTH)
  ).toBeInTheDocument();

  await userEvent.type(titleInput, title);
  await userEvent.click(submitBtn);

  expect(
    await canvas.findByText(EPublishArticleErrors.MARKDOWN_EMPTY)
  ).toBeInTheDocument();
};

export const MarkdownValidationTooShort = Template.bind({});
MarkdownValidationTooShort.args = {
  titleValue: 'Mock article title that is valid',
  markdownContentValue: 'Markdown too short',
};
MarkdownValidationTooShort.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const submitBtn = canvas.getByRole('button', { name: 'Publish article' });

  await userEvent.click(submitBtn);
  expect(
    await canvas.findByText(EPublishArticleErrors.MARKDOWN_TOO_SHORT)
  ).toBeInTheDocument();
};

export const ImageMissing = Template.bind({});
ImageMissing.args = {
  titleValue: title,
  markdownContentValue: content,
};
ImageMissing.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const submitBtn = canvas.getByRole('button', { name: 'Publish article' });

  await userEvent.click(submitBtn);

  canvas.getAllByText(EPublishArticleErrors.IMAGE_EMPTY).forEach((el) => {
    expect(el).toBeInTheDocument();
  });
};

// TODO: Spy on get request
export const SuccessfulSubmit = Template.bind({});
SuccessfulSubmit.args = {
  ...ImageMissing.args,
  imageFileValue: mockOriginalFile,
};
SuccessfulSubmit.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const submitBtn = canvas.getByRole('button', { name: 'Publish article' });
  await userEvent.click(submitBtn);
};

// export const ContentCheck = Template.bind({});
// ContentCheck.play = async (context) => {
//   const canvas = within(context.canvasElement);
//   const contentEl = canvas.getByPlaceholderText('Supports markdown. Yay!');
//   const submitBtn = canvas.getByRole('button', { name: 'Publish article' });

//   console.log(contentEl);

//   await TitleCheck.play(context);

//   expect(canvas.getByText('* Content cannot be empty!')).toBeInTheDocument();

//   expect(
//     await canvas.findByText(
//       '* Content is too short. Atleast 250 chars are needed'
//     )
//   ).toBeInTheDocument();
// };

// export const EditArticleFormExample = () => (
//   <PublishArticleForm
//     markdownContentValue={lorem}
//     title="Mock article title"
//     imageFileValue={britishCat}
//     onSubmit={createArticleSubmit}
//   />
// );

export default {
  title: 'Organisms/Publish Article Form',
  component: PublishArticleForm,
};
