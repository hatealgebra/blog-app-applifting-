import { appliftingAxiosProtected } from './services.config';

export const listArticles = async () => {
  const response = await appliftingAxiosProtected.get('/articles');
  return response;
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

  const response = await appliftingAxiosProtected.post('/articles', data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: access_token,
    },
  });
  return response;
};

export const getArticle = async (articleId: string) => {
  return appliftingAxiosProtected.get(`/articles/${articleId}`);
};

export const deleteArticle = async (
  articleId: string,
  access_token: string
) => {
  return appliftingAxiosProtected.delete(`/articles/${articleId}`, {
    headers: { Authorization: access_token },
  });
};

export const updateArticle = async (
  articleId: string,
  access_token: string | undefined,
  data: any
) => {
  return appliftingAxiosProtected.patch(`/articles/${articleId}`, data, {
    headers: { Authorization: access_token },
  });
};
