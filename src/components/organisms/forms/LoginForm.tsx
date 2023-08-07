import React from "react";
import { navigate } from "gatsby";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { postLoginThunk } from "../../../store/thunks/authentication.thunks";
import Button from "../../atoms/button/Button";
import InputWithLabel from "../../molecules/inputWithLabel/InputWithLabel";
import { StyledLoginForm } from "./forms.styled";
import { ADMIN_LINKS, navLinks } from "../../../utils/contants";

import { emailValidation, pwdValidation } from "../../../utils/regex.utils";
import { selectAuthToken } from "../../../store/slices/auth.slices";

const LoginForm = () => {
  const [email, setEmail] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  const [formError, setFormError] = React.useState<ELoginFormValidation>(
    ELoginFormValidation.CORRECT_LOGIN
  );

  const auth = useAppSelector(selectAuthToken);
  const dispatch = useAppDispatch();

  const onSubmit = async (
    e: React.FormEvent,
    email: string,
    pwd: string,
    setFormError: React.Dispatch<React.SetStateAction<ELoginFormValidation>>
  ) => {
    e.preventDefault();
    const emailTrim = email.trim();
    const pwdTrim = pwd.trim();
    if (emailTrim.length === 0 || !emailValidation(emailTrim)) {
      setFormError(ELoginFormValidation.INVALID_EMAIL);
    } else if (pwdTrim.length === 0) {
      setFormError(ELoginFormValidation.EMPTY_PASSWORD);
    } else if (!pwdValidation(pwdTrim)) {
      setFormError(ELoginFormValidation.INCORRECT_LOGIN);
    } else if (emailValidation(emailTrim) && pwdValidation(pwdTrim)) {
      dispatch(
        postLoginThunk({ email: emailTrim, pwd: pwdTrim, setFormError })
      );
      setEmail("");
      setPwd("");
    } else {
      setPwd("");
    }
  };

  React.useEffect(() => {
    auth && navigate(ADMIN_LINKS.MY_ARTICLES);
  }, []);

  return (
    <StyledLoginForm onSubmit={(e) => onSubmit(e, email, pwd, setFormError)}>
      <h3>Log In</h3>
      <InputWithLabel
        label="Email"
        placeholder="me@example.com"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputWithLabel
        label="Password"
        placeholder="Enter the password"
        type="password"
        value={pwd}
        onChange={(e) => setPwd(e.target.value)}
      />
      <span className="error">{formError}</span>
      <Button type="submit">Log In</Button>
    </StyledLoginForm>
  );
};

export enum ELoginFormValidation {
  INVALID_EMAIL = "Email should be in this format: email@example.com. Please check it.",
  EMAIL_NOT_FOUND = "Login with this email does not exist.",
  EMPTY_PASSWORD = "Password field is empty. Please check it",
  INCORRECT_LOGIN = "Incorrect login.",
  UNEXPECTED_ERROR = "Unexpected error.",
  CORRECT_LOGIN = "",
}

export default LoginForm;
