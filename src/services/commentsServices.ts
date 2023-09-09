import { appLiftingAxios } from './services.config';

export const createComment = async (
  articleId: string,
  author: string,
  content: string
) => {
  return appLiftingAxios.post(
    '/comments',
    JSON.stringify({
      articleId,
      author,
      content,
    })
  );
};

export const voteUp = (commentId: string) => {
  return appLiftingAxios.post(`/comments/${commentId}/vote/up`);
};
export const voteDown = async (commentId: string) => {
  return appLiftingAxios.post(`/comments/${commentId}/vote/down`);
};
