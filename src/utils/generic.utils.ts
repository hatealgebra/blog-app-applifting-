import { deleteImage } from '@services/imagesServices';
import { IArticle } from '@customTypes/schema';
import { deleteArticle, listArticles } from '../services/articlesOperations';

// TODO: Make tooltip component
export const cutTextWithElipsis = (text: string, limit: number) => {
  if (text.length <= limit) {
    return text;
  }
  return text.split('', limit).concat('...').join('');
};

export const clearDataAPI = async (access_token: string) => {
  const response = await listArticles();
  const { items } = response.data;
  if (items && items.length !== 0) {
    try {
      items.map(async (item: IArticle) => {
        const { articleId, imageId } = item;
        if (articleId) await deleteArticle(articleId, access_token);
        if (imageId) await deleteImage(imageId, access_token);
        return 'completed';
      });
    } catch (e) {
      return e;
    }
  }
};

export const createArticleLink = (articleId: string) =>
  `/articles/${articleId}`;
