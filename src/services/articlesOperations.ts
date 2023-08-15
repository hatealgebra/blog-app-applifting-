import axios from 'axios';

import {
  API_KEY,
  appLiftingAxiosProtected,
  BASE_API_URL,
} from './services.config';

export const listArticles = async () => {
  try {
    const response = await appLiftingAxiosProtected.get('/articles');
    return response;
  } catch (e) {
    throw e;
  }
};

export const createArticle = async (
  title: string,
  perex: string,
  imageId: string,
  content: string,
  access_token: string
) => {
  const data = {
    title,
    perex,
    imageId,
    content,
    access_token,
  };

  try {
    const response = await appLiftingAxiosProtected.post('/articles', data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: access_token,
      },
    });
    return response;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const getArticle = async (articleId: string) => {
  try {
    return await appLiftingAxiosProtected.get(`/articles/${articleId}`);
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const deleteArticle = async (
  articleId: string,
  access_token: string
) => {
  try {
    return await appLiftingAxiosProtected.delete(`/articles/${articleId}`, {
      headers: { Authorization: access_token },
    });
  } catch (e) {
    throw e;
  }
};

export const updateArticle = async (
  articleId: string,
  access_token: string | undefined,
  data: any
) => {
  try {
    const response = await appLiftingAxiosProtected.patch(
      `/articles/${articleId}`,
      data,
      {
        headers: { Authorization: access_token },
      }
    );
    return response;
  } catch (e) {
    throw e;
  }
};
