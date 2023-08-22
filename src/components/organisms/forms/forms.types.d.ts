enum ELoginFormValidation {
  INVALID_EMAIL = 'Email should be in this format: email@example.com. Please check it.',
  EMAIL_NOT_FOUND = 'Login with this email does not exist.',
  EMPTY_PASSWORD = 'Password field is empty. Please check it',
  INCORRECT_LOGIN = 'Incorrect login.',
  UNEXPECTED_ERROR = 'Unexpected error.',
  CORRECT_LOGIN = 'Success!',
}

export default ELoginFormValidation;
