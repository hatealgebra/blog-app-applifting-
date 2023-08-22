import { expect, jest } from '@storybook/jest';
import React from 'react';

import { userEvent, within } from '@storybook/testing-library';
import LoginForm from './LoginForm';
import ELoginFormValidation from './forms.types.d';

const Template = () => <LoginForm />;

export const LoginFormExample = Template.bind({});

export const EmptyEmail = Template.bind({});
EmptyEmail.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const submitButton = canvas.getByRole('button');
  await userEvent.click(submitButton);
  expect(
    await canvas.findByText(ELoginFormValidation.EMAIL_NOT_FOUND)
  ).toBeInTheDocument();
};

export const EmptyPassword = Template.bind({});
EmptyPassword.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const submitButton = canvas.getByRole('button');
  const emailInput = canvas.getByPlaceholderText('me@example.com');
  await userEvent.type(emailInput, 'random@email.com');
  await userEvent.click(submitButton);
  expect(
    canvas.getByText(ELoginFormValidation.EMPTY_PASSWORD)
  ).toBeInTheDocument();
};

export const WrongLogin = Template.bind({});
WrongLogin.play = async (context) => {
  const canvas = within(context.canvasElement);
  const passwordInput = canvas.getByPlaceholderText('Enter the password');
  const submitButton = canvas.getByRole('button');

  await EmptyPassword.play(context);
  await userEvent.type(passwordInput, 'wrongPassword');
  await userEvent.click(submitButton);

  expect(
    canvas.getByText(ELoginFormValidation.INCORRECT_LOGIN)
  ).toBeInTheDocument();
};

export const SuccesfulLogin = Template.bind({});
SuccesfulLogin.play = async (context) => {
  const canvas = within(context.canvasElement);
  const emailInput = canvas.getByPlaceholderText('me@example.com');
  const passwordInput = canvas.getByPlaceholderText('Enter the password');
  const submitButton = canvas.getByRole('button');

  await userEvent.type(emailInput, 'contact@pavel-vondra.com');
  await userEvent.type(passwordInput, 'MockPwd12345');
  await userEvent.click(submitButton);

  expect(
    canvas.getByText(ELoginFormValidation.CORRECT_LOGIN)
  ).toBeInTheDocument();
};

export default {
  title: 'Organisms/Login Form',
  comonent: LoginForm,
};
