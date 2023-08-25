export enum NavLinks {
  INDEX = '/',
  ABOUT = '/about',
  LOGIN = '/login',
  REGISTER = '/register',
}
export enum AdminLinks {
  MY_ARTICLES = '/admin/my-articles',
  CREATE_ARTICLE = '/admin/create-article',
  EDIT_ARTICLE = '/admin/edit-article',
}

export enum BREAKPOINTS {
  MOBILE = 600,
  LANDSCAPE_TABLET = 768,
  LAPTOP = 992,
  DESKTOP = 1200,
}

export enum EPublishArticleErrors {
  TITLE_EMPTY = '* Title cannot be empty!',
  TITLE_LENGTH = '* Title should be between 25 and 100 characters!',
  IMAGE_EMPTY = '* Image is mandatory. Please, choose and upload the image.',
  MARKDOWN_EMPTY = '* Content cannot be empty!',
  MARKDOWN_TOO_SHORT = '* Content is too short. Atleast 250 chars are needed',
  UNEXPECTED_ERROR = '* Sorry, but there was unexpected error. Please contact our support team!',
  PASSED = '',
}
