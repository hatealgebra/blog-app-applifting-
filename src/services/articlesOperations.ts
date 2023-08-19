import { appLiftingAxiosProtected } from './services.config';

export const listArticles = async () => {
  const response = await appLiftingAxiosProtected.get('/articles');
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

  const response = await appLiftingAxiosProtected.post('/articles', data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: access_token,
    },
  });
  return response;
};

export const getArticle = async (articleId: string) => {
  return appLiftingAxiosProtected.get(`/articles/${articleId}`);
};

export const deleteArticle = async (
  articleId: string,
  access_token: string
) => {
  return appLiftingAxiosProtected.delete(`/articles/${articleId}`, {
    headers: { Authorization: access_token },
  });
};

export const updateArticle = async (
  articleId: string,
  access_token: string | undefined,
  data: any
) => {
  const response = await appLiftingAxiosProtected.patch(
    `/articles/${articleId}`,
    data,
    {
      headers: { Authorization: access_token },
    }
  );
  return response;
};
