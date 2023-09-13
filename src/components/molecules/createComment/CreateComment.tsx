import React from 'react';
import { Components } from '@customTypes/declarations';
import publishComment from '../../../helpers/commenting.helper';
import { useAppSelector } from '../../../store/hooks';
import { selectAuthName } from '../../../store/slices/auth.slices';

import Avatar from '../../atoms/avatar/Avatar';
import Button from '../../atoms/button/Button';
import ErrorText from '../../atoms/errorText/error.styled';
import { StyledTextArea } from '../../atoms/input/input.styled';
import StyledCreateCommentForm from './createComment.styled';

export enum FormValidation {
  EMPTY = '* Comment is empty or too short. Min. length of the text should be 25 characters.',
  TOO_LONG = '* Comment is too long. Maximum is 250 characters.',
  PASSED = '',
}

interface CreateCommentProps {
  articleId: string;
  setComments: React.Dispatch<
    React.SetStateAction<Components['schemas']['Comment'][]>
  >;
}

// TODO: UseEffect for form handling
const CreateComment = ({ articleId, setComments }: CreateCommentProps) => {
  const [isActive, setIsActive] = React.useState(false);
  const [content, setContent] = React.useState('');
  const [formHandling, setFormHandling] = React.useState<FormValidation>(
    FormValidation.PASSED
  );
  const loggedUser = useAppSelector(selectAuthName);

  const onSubmit = (
    e: React.FormEvent,
    setCurrComments: React.Dispatch<
      React.SetStateAction<Components['schemas']['Comment'][]>
    >
  ) => {
    e.preventDefault();

    if (!loggedUser) return null;
    if (content.length < 25) return setFormHandling(FormValidation.EMPTY);
    if (content.length > 250) return setFormHandling(FormValidation.TOO_LONG);

    const publish = publishComment(
      articleId,
      loggedUser,
      content,
      setCurrComments
    );
    console.log(publish);
    setIsActive(false);
    setFormHandling(FormValidation.PASSED);
    return setContent('');
  };

  return (
    <StyledCreateCommentForm
      onSubmit={(e) => onSubmit(e, setComments)}
      onClick={() => {
        if (!loggedUser && typeof window !== `undefined`) {
          // eslint-disable-next-line no-alert
          window.alert('You need to be signed in to comment this article!');
        }
      }}
      onBlur={(e: React.FocusEvent<HTMLFormElement>) =>
        e.relatedTarget === null && setIsActive(false)
      }
    >
      <Avatar />
      <StyledTextArea
        disabled={!loggedUser}
        onFocus={() => setIsActive(true)}
        placeholder={
          loggedUser
            ? 'Join the discussion'
            : 'You need to be signed to comment this article!'
        }
        rows={isActive ? 8 : 1}
        name="comment"
        value={content}
        onChange={(e) => {
          return setContent(e.target.value);
        }}
      />
      {isActive && <Button type="submit">Send Comment</Button>}
      <ErrorText>{formHandling}</ErrorText>
    </StyledCreateCommentForm>
  );
};

export default CreateComment;
