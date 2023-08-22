import React, { FormEvent } from 'react';
import {
  updateArticleHelper,
  validatePublishArticleForm,
} from '@helpers/publishArticle.helper';
import AdminHeading from '../../molecules/adminHeading/AdminHeading';
import MarkdownEditor from '../../atoms/markdownEditor/MarkdownEditor';
import InputWithLabel from '../../molecules/inputWithLabel/InputWithLabel';
import UploadImage from '../../molecules/uploadImage/UploadImage';
import StyledPublishArticleForm from './publishArticleForm.styled';
import ErrorText from '../../atoms/errorText/error.styled';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

import { selectAuthToken } from '../../../store/slices/auth.slices';

import { cutTextWithElipsis } from '../../../utils/generic.utils';
import { createArticleThunk } from '../../../store/thunks/admin.thunks';
import {
  EPublishArticleErrors,
  PublishArticleProps,
} from './publishArticleForm.types.d';

// FIXME: maybe implement do BIG notation?
// TODO: Testing
// FIXME: When editing the article, get the loading screen maybe?
// TODO: useEffect for for error handling
const PublishArticleForm = ({
  titleValue,
  markdownContentValue,
  imageFileValue,
}: PublishArticleProps) => {
  const [articleId] = React.useState(undefined);
  const [title, setTitle] = React.useState(titleValue || '');
  const [markdownContent, setMarkdownContent] = React.useState(
    markdownContentValue || ''
  );
  const [imageFile, setImageFile] = React.useState<File | null>(
    imageFileValue || null
  );
  const [isImageChanged, setIsImageChanged] = React.useState(false);
  const [formError, setFormError] = React.useState<EPublishArticleErrors>(
    EPublishArticleErrors.PASSED
  );

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const access_token = useAppSelector(selectAuthToken);
  const dispatch = useAppDispatch();

  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    const trimmedMD = markdownContent.trim();
    const perex = cutTextWithElipsis(trimmedMD, 130);

    const formValidationPassed = validatePublishArticleForm(
      trimmedTitle,
      trimmedMD,
      imageFile,
      setFormError
    );

    if (formValidationPassed) {
      const imageFormData = new FormData();
      imageFormData.append('image', imageFile!);
      if (articleId) {
        return updateArticleHelper(
          e,
          articleId,
          trimmedTitle,
          perex,
          trimmedMD,
          imageFormData!,
          access_token,
          isImageChanged
        );
      }
      return dispatch(
        createArticleThunk({
          title: trimmedTitle,
          perex,
          content: trimmedMD,
          imageFormData,
          access_token,
        })
      );
    }
    return false;
  };

  React.useEffect(() => {
    setIsImageChanged(true);
  }, [setImageFile]);

  return (
    <StyledPublishArticleForm onSubmit={(e) => handleOnSubmit(e)}>
      <AdminHeading
        heading="Create new article"
        buttonText="Publish article"
        isFormPage
      />
      <div>
        <InputWithLabel
          label="Article title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="My new article"
        />
        <ErrorText>
          {formError === EPublishArticleErrors.TITLE_EMPTY &&
            EPublishArticleErrors.TITLE_EMPTY}
        </ErrorText>
      </div>
      <div>
        <UploadImage image={imageFile} setImage={setImageFile} />
        <ErrorText>
          {formError === EPublishArticleErrors.IMAGE_EMPTY &&
            EPublishArticleErrors.IMAGE_EMPTY}
        </ErrorText>
      </div>
      <div>
        <MarkdownEditor value={markdownContent} onChange={setMarkdownContent} />
        <ErrorText>{formError}</ErrorText>
      </div>
    </StyledPublishArticleForm>
  );
};

export default PublishArticleForm;
