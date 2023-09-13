import { expect } from '@jest/globals';

import { EPublishArticleErrors } from '@utils/contants';
import validatePublishArticleForm from './publishArticle.helper';

const titleTooShort = 'Title value';
const inputValue = 'Input value, yup this is it';
const markdownShortValue = 'Input value';
const markdownPassValue =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus ipsum id dolor ad, incidunt odio, a fugiat totam nemo officia nobis excepturi similique! Vel blanditiis explicabo unde placeat veniam non! Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus ipsum id dolor ad, incidunt odio, a fugiat totam nemo officia nobis excepturi similique! Vel blanditiis explicabo unde placeat veniam non!';
const mockFile = new File(['goodbye'], 'goodbye.png', {
  type: 'image/png',
});

const {
  TITLE_EMPTY,
  TITLE_LENGTH,
  MARKDOWN_EMPTY,
  MARKDOWN_TOO_SHORT,
  IMAGE_EMPTY,
  UNEXPECTED_ERROR,
} = EPublishArticleErrors;

describe('Validate Publish article form test suite', () => {
  test('Everything is empty', () => {
    expect(validatePublishArticleForm('', '', null)).toBe(TITLE_EMPTY);
  });

  test('Everything is empty error value', () => {
    const validation = validatePublishArticleForm('', '', null);
    expect(validation).toBe(TITLE_EMPTY);
  });

  test('Title is too short', () => {
    const validation = validatePublishArticleForm(titleTooShort, '', null);
    expect(validation).toBe(TITLE_LENGTH);
  });

  test('Title is too long', () => {
    const validation = validatePublishArticleForm(markdownPassValue, '', null);
    expect(validation).toBe(TITLE_LENGTH);
  });

  test('Markdown is empty error value', () => {
    const validation = validatePublishArticleForm(inputValue, '', null);
    expect(validation).toBe(MARKDOWN_EMPTY);
  });

  test('Markdown is too short', () => {
    expect(
      validatePublishArticleForm(inputValue, markdownShortValue, null)
    ).toBe(MARKDOWN_TOO_SHORT);
  });

  test('Uploaded file is empty', () => {
    expect(
      validatePublishArticleForm(inputValue, markdownPassValue, null)
    ).toBe(IMAGE_EMPTY);
  });

  test('Everything is filled correctly', () => {
    expect(
      validatePublishArticleForm(inputValue, markdownPassValue, mockFile)
    ).toBe('');
  });

  test('Everything is filled correctly error value', () => {
    const validation = validatePublishArticleForm(
      inputValue,
      markdownPassValue,
      mockFile
    );
    expect(validation).toBe('');
  });

  test('Unexpected error', () => {
    const validation = validatePublishArticleForm(
      undefined,
      undefined,
      undefined
    );
    expect(validation).toBe(UNEXPECTED_ERROR);
  });
});

jest.mock('gatsby', () => {
  const gatsby = jest.requireActual('gatsby');

  return {
    ...gatsby,
    navigate: jest.fn(),
  };
});
