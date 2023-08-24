import React from 'react';
import { Components } from '../../../customTypes/declarations';
import Comment from '../../molecules/comment/Comment';
import CreateComment from '../../molecules/createComment/CreateComment';
import StyledDiscussionComments from './discussion.styled';

// TODO: Add state to inform the user that there are no comments yet
const Discussion = ({ articleId, commentsArray }: DiscussionProps) => {
  const [comments, setComments] = React.useState<
    Array<Components['schemas']['Comment']>
  >(commentsArray ?? []);

  return (
    <div className="discussion">
      <CreateComment articleId={articleId} setComments={setComments} />
      <StyledDiscussionComments>
        {comments &&
          comments.map((comment) => {
            const {
              commentId,
              author,
              postedAt,
              score,
              content,
              articleId: destructureArticleId,
            } = comment;
            return (
              <Comment
                key={`${commentId}`}
                commentId={commentId}
                author={author}
                postedAt={postedAt}
                score={score}
                content={content}
                articleId={destructureArticleId}
              />
            );
          })}
      </StyledDiscussionComments>
    </div>
  );
};

export interface DiscussionProps {
  articleId: string;
  commentsArray: Components['schemas']['Comment'][] | [];
}

export default Discussion;
