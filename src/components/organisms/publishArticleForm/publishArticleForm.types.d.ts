export interface PublishArticleProps {
  titleValue?: string;
  markdownContentValue?: string;
  imageFileValue?: File | null;
}

export enum EPublishArticleErrors {
  TITLE_EMPTY = '* Title cannot be empty!',
  TITLE_LENGTH = '* Title should be between 25 and 100 characters!',
  IMAGE_EMPTY = '* Image is mandatory. Please, choose and upload the image.',
  MARKDOWN_EMPY = '* Content cannot be empty!',
  MARKDOWN_TOO_SHORT = '* Content is too short. Atleast 250 chars are needed',
  UNEXPECTED_ERROR = '* Sorry, but there was unexpected error. Please contact our support team!',
  PASSED = '',
}
