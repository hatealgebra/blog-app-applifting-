import { navigate } from 'gatsby';
import React, { FormEvent } from 'react';

import { EPublishArticleErrors } from '@organisms/publishArticleForm/publishArticleForm.types';

import { updateArticle } from '@services/articlesOperations';
import { uploadImage } from '../services/imagesServices';
import { AdminLinks } from '../utils/contants';

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

export const validatePublishArticleForm: TFormHandling = (
  title,
  markdownContent,
  imageFile,
  setFormError
) => {
  const {
    TITLE_EMPTY,
    TITLE_LENGTH,
    IMAGE_EMPTY,
    MARKDOWN_EMPY,
    MARKDOWN_TOO_SHORT,
    UNEXPECTED_ERROR,
    PASSED,
  } = EPublishArticleErrors;
  if (title === '') {
    setFormError(TITLE_EMPTY);
    return false;
  }
  if (title.length < 25 || title.length > 100) {
    setFormError(TITLE_LENGTH);
    return false;
  }
  if (markdownContent === '') {
    setFormError(MARKDOWN_EMPY);
    return false;
  }
  if (markdownContent.length < 250) {
    setFormError(MARKDOWN_TOO_SHORT);
    return false;
  }
  if (imageFile === null) {
    setFormError(IMAGE_EMPTY);
    return false;
  }
  if (title !== '' && imageFile !== null && markdownContent.length >= 250) {
    setFormError(PASSED);
    return true;
  }
  setFormError(UNEXPECTED_ERROR);
  return false;
};

export const updateArticleHelper = async (
  e: FormEvent,
  articleId: string,
  title: string,
  perex: string,
  content: string,
  imageFormData: FormData,
  access_token: string | undefined,
  isImageChanged: boolean
) => {
  try {
    if (isImageChanged) {
      const uploadImageResponse = await uploadImage(
        imageFormData,
        access_token!
      );
      return await updateArticle(articleId, access_token, {
        title,
        perex,
        imageId: await uploadImageResponse!.data[0].imageId,
        content,
      });
    }
    updateArticle(articleId, access_token, { title, perex, content });
    return await navigate(AdminLinks.MY_ARTICLES);
  } catch (e) {
    return e;
  }
};
