import { EPublishArticleErrors } from '../utils/contants';

type TFormHandling = (
  title: string,
  markdownContent: string,
  imageFile: string | Blob | null
) => EPublishArticleErrors;

const validatePublishArticleForm: TFormHandling = (
  title,
  markdownContent,
  imageFile
) => {
  const {
    TITLE_EMPTY,
    TITLE_LENGTH,
    IMAGE_EMPTY,
    MARKDOWN_EMPTY,
    MARKDOWN_TOO_SHORT,
    UNEXPECTED_ERROR,
    PASSED,
  } = EPublishArticleErrors;

  if (title === '') {
    return TITLE_EMPTY;
  }
  if (title?.length < 25 || title?.length > 100) {
    return TITLE_LENGTH;
  }
  if (markdownContent === '') {
    return MARKDOWN_EMPTY;
  }
  if (markdownContent?.length < 250) {
    return MARKDOWN_TOO_SHORT;
  }
  if (imageFile === null) {
    return IMAGE_EMPTY;
  }
  if (title !== '' && imageFile !== null && markdownContent?.length >= 250) {
    return PASSED;
  }
  return UNEXPECTED_ERROR;
};

export default validatePublishArticleForm;
