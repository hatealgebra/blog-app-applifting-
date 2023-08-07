import { deleteArticle, listArticles } from "../services/articlesOperations";

// TODO: Make tooltip component
export const cutTextWithElipsis = (text: string, limit: number) => {
  if (text.length <= limit) {
    return text;
  } else {
    return text.split("", limit).concat("...").join("");
  }
};

export const clearDataAPI = async (access_token: string) => {
  const response = await listArticles();
  const { items } = response.data;
  if (items && items.length !== 0) {
    try {
      items.map((item) => {
        const { articleId, imageId } = item;
        articleId && deleteArticle(articleId, access_token);
      });
    } catch (e) {
      console.log(e);
    }
  }
};

export const createArticleLink = (articleId: string) =>
  `/articles/${articleId}`;
