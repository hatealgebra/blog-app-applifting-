import React from 'react';
import { createComment } from '../services/commentsServices';
import { components } from '../customTypes/declarations';

const publishComment = async (
  articleId: string,
  author: string,
  content: string,
  setComments: React.Dispatch<
    React.SetStateAction<components['schemas']['Comment'][]>
  >
) => {
  const trimmedContent = content.trim();
  try {
    const response = await createComment(articleId, author, trimmedContent);
    const { data } = response;
    setComments((prevState) => {
      return prevState.concat(data);
    });
  } catch (e) {
    return e;
  }
};

export default publishComment;
