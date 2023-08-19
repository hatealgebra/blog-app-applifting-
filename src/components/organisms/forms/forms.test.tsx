// import React from 'react';

// import { userEvent } from '@testing-library/user-event/dist/types/setup';
// import { findByText } from '@testing-library/dom';
// import { setupTestWithStore } from '../../../utils/testing.utils';
// import LoginForm from './LoginForm';

// describe('Login form testing', () => {
//   let emailInput: HTMLElement;
//   let pwdInput: HTMLElement;
//   let submitButton: HTMLElement;
//   beforeAll(() => {
//     const { getByRole, getByPlaceholderText } = setupTestWithStore(
//       <LoginForm />
//     );
//     emailInput = getByPlaceholderText('me@example.com');
//     pwdInput = getByPlaceholderText('Enter the password');
//     submitButton = getByRole('button');
//   });

//   test('email is empty', async () => {
//     userEvent.click(submitButton);
//     await findByText(
//       'Email should be in this format: email@example.com. Please check it.'
//     );
//   });
// });
