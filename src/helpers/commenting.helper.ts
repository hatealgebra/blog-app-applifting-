import React from "react";
import { createComment } from "../services/commentsServices";
import { components } from "../types/declarations";

export const publishComment = async (
  articleId: string,
  author: string,
  content: string,
  setComments: React.Dispatch<
    React.SetStateAction<components["schemas"]["Comment"][]>
  >
) => {
  const trimmedContent = content.trim();
  try {
    const response = await createComment(articleId, author, trimmedContent);
    const { data } = response;
    console.log(response);
    setComments((prevState) => {
      return prevState.concat(data);
    });
    return;
  } catch (e) {
    console.log(e.response.data);
    return e;
  }
};
