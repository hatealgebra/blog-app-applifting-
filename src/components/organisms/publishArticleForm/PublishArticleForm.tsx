import React, { FormEvent } from "react";
import AdminHeading from "../../molecules/adminHeading/AdminHeading";
import MarkdownEditor from "../../atoms/markdownEditor/MarkdownEditor";
import InputWithLabel from "../../molecules/inputWithLabel/InputWithLabel";
import UploadImage from "../../molecules/uploadImage/UploadImage";
import { StyledPublishArticleForm } from "./publishArticleForm.styled";
import { ErrorText } from "../../atoms/errorText/error.styled";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";

import { selectAuthToken } from "../../../store/slices/auth.slices";
import {
  updateArticleHelper,
  validatePublishArticleForm,
} from "../../../helpers/publishArticle.helper";
import { cutTextWithElipsis } from "../../../utils/generic.utils";
import { createArticleThunk } from "../../../store/thunks/admin.thunks";

// FIXME: maybe implement do BIG notation?
// TODO: Testing
// FIXME: When editing the article, get the loading screen maybe?
// TODO: useEffect for for error handling
const PublishArticleForm = ({
  titleValue,
  markdownContentValue,
  imageFileValue,
  ...props
}: PublishArticleProps) => {
  const [articleId, setArticleId] = React.useState(undefined);
  const [title, setTitle] = React.useState("");
  const [markdownContent, setMarkdownContent] = React.useState("");
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [isImageChanged, setIsImageChanged] = React.useState(false);
  const [formError, setFormError] = React.useState<EPublishArticleErrors>(
    EPublishArticleErrors.PASSED
  );

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
      let imageFormData = new FormData();
      imageFormData.append("image", imageFile!);
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
      } else {
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
    }
  };

  React.useEffect(() => {
    setIsImageChanged(true);
  }, [setImageFile]);

  React.useEffect(() => {
    setTitle((prevState) => titleValue ?? prevState);
    setMarkdownContent((prevState) => markdownContentValue ?? prevState);
    setImageFile((prevState) => imageFileValue || prevState);
  }, [titleValue, markdownContentValue, imageFileValue]);

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
        <ErrorText>
          {formError === EPublishArticleErrors.MARKDOWN_EMPY
            ? EPublishArticleErrors.MARKDOWN_EMPY
            : formError === EPublishArticleErrors.MARKDOWN_TOO_SHORT
            ? EPublishArticleErrors.MARKDOWN_TOO_SHORT
            : ""}
        </ErrorText>
      </div>
    </StyledPublishArticleForm>
  );
};

export interface PublishArticleProps {
  titleValue?: string;
  markdownContentValue?: string;
  imageFileValue?: File | null;
}

export enum EPublishArticleErrors {
  TITLE_EMPTY = "* Title cannot be empty!",
  TITLE_LENGTH = "* Title should be between 25 and 100 characters!",
  IMAGE_EMPTY = "* Image is mandatory. Please, choose and upload the image.",
  MARKDOWN_EMPY = "* Content cannot be empty!",
  MARKDOWN_TOO_SHORT = "* Content is too short. Atleast 250 chars are needed",
  UNEXPECTED_ERROR = "* Sorry, but there was unexpected error. Please contact our support team!",
  PASSED = "",
}

export default PublishArticleForm;
