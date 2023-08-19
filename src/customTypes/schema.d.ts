import { Components } from './declarations';

export interface IArticle {
  articleId: string;
  title: string;
  perex: string;
  imageId: string;
  createdAt: string;
  lastUpdateAt: string;
}

export type TArticleDetail = Components['schemas']['Article'] &
  Components['schemas']['ArticleDetail'] & {
    imageBase64: 'string';
  };

export type TCompleteArticles = Array<TArticleDetail>;

export interface ICompleteArticleList {
  articleList: {
    pagination?: Components['schemas']['Pagination'];
    items?: TCompleteArticles;
  };
}
