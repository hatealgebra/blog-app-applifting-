import React from 'react';
import { navigate } from 'gatsby';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { postLoginThunk } from '../../../store/thunks/authentication.thunks';
import Button from '../../atoms/button/Button';
import InputWithLabel from '../../molecules/inputWithLabel/InputWithLabel';
import StyledLoginForm from './forms.styled';
import { AdminLinks } from '../../../utils/contants';

import { emailValidation, pwdValidation } from '../../../utils/regex.utils';
import { selectAuthToken } from '../../../store/slices/auth.slices';
import ELoginFormValidation from './forms.types';

const LoginForm = () => {
  const [email, setEmail] = React.useState('');
  const [pwd, setPwd] = React.useState('');
  const [formError, setFormError] = React.useState<ELoginFormValidation>(
    ELoginFormValidation.CORRECT_LOGIN
  );

  const auth = useAppSelector(selectAuthToken);
  const dispatch = useAppDispatch();

  const onSubmit = async (
    e: React.FormEvent,
    mail: string,
    password: string,
    dispatchFormErr: React.Dispatch<React.SetStateAction<ELoginFormValidation>>
  ) => {
    e.preventDefault();
    const emailTrim = mail.trim();
    const pwdTrim = password.trim();
    if (emailTrim.length === 0 || !emailValidation(emailTrim)) {
      dispatchFormErr(ELoginFormValidation.INVALID_EMAIL);
    } else if (pwdTrim.length === 0) {
      dispatchFormErr(ELoginFormValidation.EMPTY_PASSWORD);
    } else if (!pwdValidation(pwdTrim)) {
      dispatchFormErr(ELoginFormValidation.INCORRECT_LOGIN);
    } else if (emailValidation(emailTrim) && pwdValidation(pwdTrim)) {
      dispatch(
        postLoginThunk({ email: emailTrim, pwd: pwdTrim, setFormError })
      );
      setEmail('');
      setPwd('');
    } else {
      setPwd('');
    }
  };

  React.useEffect(() => {
    auth && navigate(AdminLinks.MY_ARTICLES);
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

export default LoginForm;
