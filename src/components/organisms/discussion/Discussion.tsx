import React from "react";
import { components } from "../../../types/declarations";
import Comment from "../../molecules/comment/Comment";
import CreateComment from "../../molecules/createComment/CreateComment";
import {
  StyledDiscussion,
  StyledDiscussionComments,
} from "./discussion.styled";

// TODO: Add state to inform the user that there are no comments yet
const Discussion = ({ articleId, commentsArray }: DiscussionProps) => {
  const [comments, setComments] = React.useState<
    Array<components["schemas"]["Comment"]>
  >(commentsArray ?? []);

  console.log(comments);

  return (
    <StyledDiscussion className="discussion">
      <CreateComment articleId={articleId} setComments={setComments} />
      <StyledDiscussionComments>
        {comments &&
          comments.map((comment, i) => {
            const { commentId, author, postedAt, score, content, articleId } =
              comment;
            return (
              <Comment
                key={`${commentId}`}
                commentId={commentId}
                author={author}
                postedAt={postedAt}
                score={score}
                content={content}
                articleId={articleId}
              />
            );
          })}
      </StyledDiscussionComments>
    </StyledDiscussion>
  );
};

export interface DiscussionProps {
  articleId: string;
  commentsArray: components["schemas"]["Comment"][] | [];
}

export default Discussion;
