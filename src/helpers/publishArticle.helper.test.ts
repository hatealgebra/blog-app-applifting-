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

const mockDispatchError = jest.fn();

describe('Validate Publish article form test suite', () => {
  test('Everything is empty', () => {
    expect(validatePublishArticleForm('', '', null, mockDispatchError)).toBe(
      false
    );
  });

  test('Everything is empty error value', () => {
    validatePublishArticleForm('', '', null, mockDispatchError);
    expect(mockDispatchError).toBeCalledWith(EPublishArticleErrors.TITLE_EMPTY);
  });

  test('Title is too short', () => {
    validatePublishArticleForm(titleTooShort, '', null, mockDispatchError);
    expect(mockDispatchError).toBeCalledWith(
      EPublishArticleErrors.TITLE_LENGTH
    );
  });

  test('Title is too long', () => {
    validatePublishArticleForm(markdownPassValue, '', null, mockDispatchError);
    expect(mockDispatchError).toBeCalledWith(
      EPublishArticleErrors.TITLE_LENGTH
    );
  });

  test('Markdown is empty', () => {
    expect(
      validatePublishArticleForm(inputValue, '', null, mockDispatchError)
    ).toBe(false);
  });

  test('Markdown is empty error value', () => {
    validatePublishArticleForm(inputValue, '', null, mockDispatchError);
    expect(mockDispatchError).toBeCalledWith(
      EPublishArticleErrors.MARKDOWN_EMPTY
    );
  });

  test('Markdown is too short', () => {
    expect(
      validatePublishArticleForm(
        inputValue,
        markdownShortValue,
        null,
        mockDispatchError
      )
    ).toBe(false);
  });

  test('Markdown is too short error value', () => {
    validatePublishArticleForm(
      inputValue,
      markdownShortValue,
      null,
      mockDispatchError
    );
    expect(mockDispatchError).toBeCalledWith(
      EPublishArticleErrors.MARKDOWN_TOO_SHORT
    );
  });

  test('Uploaded file is empty', () => {
    expect(
      validatePublishArticleForm(
        inputValue,
        markdownPassValue,
        null,
        mockDispatchError
      )
    ).toBe(false);
  });

  test('Uploaded file is empty error value', () => {
    validatePublishArticleForm(
      inputValue,
      markdownPassValue,
      null,
      mockDispatchError
    );
    expect(mockDispatchError).toBeCalledWith(EPublishArticleErrors.IMAGE_EMPTY);
  });

  test('Everything is filled correctly', () => {
    expect(
      validatePublishArticleForm(
        inputValue,
        markdownPassValue,
        mockFile,
        mockDispatchError
      )
    ).toBe(true);
  });

  test('Everything is filled correctly error value', () => {
    validatePublishArticleForm(
      inputValue,
      markdownPassValue,
      mockFile,
      mockDispatchError
    );
    expect(mockDispatchError).toBeCalledWith(EPublishArticleErrors.PASSED);
  });

  test('Unexpected error', () => {
    validatePublishArticleForm(
      undefined,
      undefined,
      undefined,
      mockDispatchError
    );
    expect(mockDispatchError).toBeCalledWith(
      EPublishArticleErrors.UNEXPECTED_ERROR
    );
  });
});

jest.mock('gatsby', () => {
  const gatsby = jest.requireActual('gatsby');

  return {
    ...gatsby,
    navigate: jest.fn(),
  };
});
