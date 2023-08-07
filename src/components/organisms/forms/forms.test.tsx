import React from "react";

import userEvent from "@testing-library/user-event";

import { setupTest, setupTestWithStore } from "../../../utils/testing.utils";
import LoginForm from "./LoginForm";
import { findByText, screen } from "@testing-library/react";

describe("Login form testing", () => {
  let emailInput: HTMLElement;
  let pwdInput: HTMLElement;
  let submitButton: HTMLElement;
  beforeEach(() => {
    const { getByRole, getByPlaceholderText } = setupTestWithStore(
      <LoginForm />
    );
    emailInput = getByPlaceholderText("me@example.com");
    pwdInput = getByPlaceholderText("Enter the password");
    submitButton = getByRole("button");
  });

  test("email is empty", async () => {
    userEvent.click(submitButton);
    await screen.findByText(
      "Email should be in this format: email@example.com. Please check it."
    );
  });
});
