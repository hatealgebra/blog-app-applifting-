import React from 'react';

import { EPublishArticleErrors } from '../utils/contants';

type TFormHandling = (
  title: string,
  markdownContent: string,
  imageFile: string | Blob | null,
  setFormError: React.Dispatch<React.SetStateAction<EPublishArticleErrors>>
) =>
  | {
      trimmedTitle: string;
      trimmedMarkdownContent: string;
      imageFile: string | Blob | null;
      perex: string;
    }
  | boolean;

const validatePublishArticleForm: TFormHandling = (
  title,
  markdownContent,
  imageFile,
  setFormError
) => {
  const {
    TITLE_EMPTY,
    TITLE_LENGTH,
    IMAGE_EMPTY,
    MARKDOWN_EMPTY,
    MARKDOWN_TOO_SHORT,
    UNEXPECTED_ERROR,
    PASSED,
  } = EPublishArticleErrors;

  if (title === '') {
    setFormError(TITLE_EMPTY);
    return false;
  }
  if (title?.length < 25 || title?.length > 100) {
    setFormError(TITLE_LENGTH);
    return false;
  }
  if (markdownContent === '') {
    setFormError(MARKDOWN_EMPTY);
    return false;
  }
  if (markdownContent?.length < 250) {
    setFormError(MARKDOWN_TOO_SHORT);
    return false;
  }
  if (imageFile === null) {
    setFormError(IMAGE_EMPTY);
    return false;
  }
  if (title !== '' && imageFile !== null && markdownContent?.length >= 250) {
    setFormError(PASSED);
    return true;
  }
  setFormError(UNEXPECTED_ERROR);
  return false;
};

export default validatePublishArticleForm;
