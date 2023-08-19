import React from 'react';
import { Components } from '@customTypes/declarations';
import { createComment } from '../services/commentsServices';

const publishComment = async (
  articleId: string,
  author: string,
  content: string,
  setComments: React.Dispatch<
    React.SetStateAction<Components['schemas']['Comment'][]>
  >
) => {
  const trimmedContent = content.trim();
  try {
    const response = await createComment(articleId, author, trimmedContent);
    const { data } = response;
    return setComments((prevState) => {
      return prevState.concat(data);
    });
  } catch (e) {
    return e;
  }
};

export default publishComment;
