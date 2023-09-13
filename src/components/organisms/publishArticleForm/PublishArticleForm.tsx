import React, { FormEvent, useEffect } from 'react';

import { EPublishArticleErrors } from '@utils/contants';
import validatePublishArticleForm from '@helpers/publishArticle.helper';

import AdminHeading from '../../molecules/adminHeading/AdminHeading';
import MarkdownEditor from '../../atoms/markdownEditor/MarkdownEditor';
import InputWithLabel from '../../molecules/inputWithLabel/InputWithLabel';
import UploadImage from '../../molecules/uploadImage/UploadImage';
import StyledPublishArticleForm from './publishArticleForm.styled';
import ErrorText from '../../atoms/errorText/error.styled';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

import { selectAuthToken } from '../../../store/slices/auth.slices';

import { cutTextWithElipsis } from '../../../utils/generic.utils';
import {
  createArticleThunk,
  editArticleThunk,
} from '../../../store/thunks/admin.thunks';
import { PublishArticleProps } from './publishArticleForm.types.d';

// FIXME: maybe implement do BIG notation?
// TODO: Testing
// FIXME: When editing the article, get the loading screen maybe?
// TODO: useEffect for for error handling
const PublishArticleForm = ({
  articleId,
  titleValue,
  markdownContentValue,
  imageBase64,
}: PublishArticleProps) => {
  const [title, setTitle] = React.useState(titleValue || '');
  const [markdownContent, setMarkdownContent] = React.useState(
    markdownContentValue || ''
  );
  const [originalImageFile, setOriginalImageFile] = React.useState<File | null>(
    null
  );
  const [currentImageFile, setCurrentImageFile] = React.useState<File | null>(
    null
  );
  const [isImageChanged, setIsImageChanged] = React.useState(false);
  const [formError, setFormError] = React.useState<EPublishArticleErrors>(
    EPublishArticleErrors.PASSED
  );

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const access_token = useAppSelector(selectAuthToken);
  const dispatch = useAppDispatch();

  const handleOnSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    const trimmedMD = markdownContent.trim();
    const perex = cutTextWithElipsis(trimmedMD, 130);

    const formValidationPassed = validatePublishArticleForm(
      trimmedTitle,
      trimmedMD,
      currentImageFile
    );

    setFormError(formValidationPassed);

    if (formValidationPassed === EPublishArticleErrors.IMAGE_EMPTY) {
      alert(
        'Image was empty. Original image will be used instead, if the image is not changed.'
      );

      setCurrentImageFile(originalImageFile);
      return setFormError(EPublishArticleErrors.PASSED);
    }

    if (formValidationPassed === EPublishArticleErrors.PASSED) {
      const imageFormData = new FormData();
      imageFormData.append('image', currentImageFile);

      if (articleId) {
        return dispatch(
          editArticleThunk({
            articleId,
            title: trimmedTitle,
            perex,
            content: trimmedMD,
            imageFormData,
            access_token,
            isImageChanged,
          })
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

  const arrayBufferToFile = (buffer, filename) => {
    const blob = new Blob([buffer], { type: 'image/Png' });
    return new File([blob], filename, { type: 'image/Png' });
  };

  const handleExistingImage = async (arrayBuffer: ArrayBuffer) => {
    if (!arrayBuffer) return null;

    const bufferToFile = arrayBufferToFile(
      arrayBuffer,
      `${articleId}-image.png`
    );
    setOriginalImageFile(bufferToFile);
    return setCurrentImageFile(bufferToFile);
  };

  React.useEffect(() => {
    setIsImageChanged(true);
  }, [setCurrentImageFile]);

  useEffect(() => {
    if (!imageBase64) return;

    handleExistingImage(imageBase64);
    // eslint-disable-next-line
  }, [imageBase64]);

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
        <UploadImage
          imageFile={currentImageFile}
          setImageFile={setCurrentImageFile}
        />
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
