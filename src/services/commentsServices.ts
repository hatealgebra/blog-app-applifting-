import { appliftingAxiosProtected } from './services.config';

export const createComment = async (
  articleId: string,
  author: string,
  content: string
) => {
  return appliftingAxiosProtected.post(
    '/comments',
    JSON.stringify({
      articleId,
      author,
      content,
    })
  );
};

export const voteUp = (commentId: string) => {
  return appliftingAxiosProtected.post(`/comments/${commentId}/vote/up`);
};
export const voteDown = async (commentId: string) => {
  return appliftingAxiosProtected.post(`/comments/${commentId}/vote/down`);
};
