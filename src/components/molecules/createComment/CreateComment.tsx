import React from 'react';
import { Components } from '@customTypes/declarations';
import publishComment from '../../../helpers/commenting.helper';
import { useAppSelector } from '../../../store/hooks';
import { selectAuthName } from '../../../store/slices/auth.slices';

import Avatar from '../../atoms/avatar/Avatar';
import Button from '../../atoms/button/Button';
import { ErrorText } from '../../atoms/errorText/error.styled';
import { StyledTextArea } from '../../atoms/input/input.styled';
import { StyledCreateCommentForm } from './createComment.styled';

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
    if (content.length < 25) {
      setFormHandling(FormValidation.EMPTY);
    } else if (content.length > 250) {
      setFormHandling(FormValidation.TOO_LONG);
    } else if (loggedUser) {
      publishComment(articleId, loggedUser, content, setCurrComments);
      setIsActive(false);
      setFormHandling(FormValidation.PASSED);
      setContent('');
    }
  };

  return (
    <StyledCreateCommentForm
      onSubmit={(e) => onSubmit(e, setComments)}
      onClick={() => {
        if (!loggedUser && typeof window !== `undefined`) {
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
        placeholder="Join the discussion"
        rows={isActive ? 8 : 1}
        name="comment"
        value={content}
        onChange={(e) => {
          return setContent(e.target.value);
        }}
      />
      {isActive && <Button type="submit">Send comment</Button>}
      <ErrorText>{formHandling}</ErrorText>
    </StyledCreateCommentForm>
  );
};

export default CreateComment;
