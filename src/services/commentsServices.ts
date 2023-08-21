import { appLiftingAxiosProtected } from './services.config';

export const createComment = async (
  articleId: string,
  author: string,
  content: string
) => {
  return appLiftingAxiosProtected.post(
    '/comments',
    JSON.stringify({
      articleId,
      author,
      content,
    })
  );
};

export const voteUp = (commentId: string) => {
  return appLiftingAxiosProtected.post(`/comments/${commentId}/vote/up`);
};
export const voteDown = async (commentId: string) => {
  return appLiftingAxiosProtected.post(`/comments/${commentId}/vote/down`);
};
