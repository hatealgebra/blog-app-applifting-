import { createAsyncThunk } from '@reduxjs/toolkit';
import { navigate } from 'gatsby';

// import ELoginFormValidation from '@organisms/forms/forms.types';

import loginPOST from '../../services/authServices';
import { USER_CONFIG } from '../../services/services.config';
import { getTenant } from '../../services/tenantServices';
import { AdminLinks } from '../../utils/contants';

enum ELoginFormValidation {
  INVALID_EMAIL = 'Email should be in this format: email@example.com. Please check it.',
  EMAIL_NOT_FOUND = 'Login with this email does not exist.',
  EMPTY_PASSWORD = 'Password field is empty. Please check it',
  INCORRECT_LOGIN = 'Incorrect login.',
  UNEXPECTED_ERROR = 'Unexpected error.',
  CORRECT_LOGIN = '',
}

export const postLoginThunk = createAsyncThunk(
  'auth/login',
  async (
    {
      email,
      pwd,
      setFormError,
    }: {
      email: string;
      pwd: string;
      setFormError: React.Dispatch<React.SetStateAction<ELoginFormValidation>>;
    },
    thunkAPI
  ) => {
    try {
      setFormError(ELoginFormValidation.CORRECT_LOGIN);
      const authorizationResponse = await loginPOST(email, pwd);
      const tenantResponse = await getTenant(USER_CONFIG.TENANT_ID);
      navigate(AdminLinks.MY_ARTICLES);
      return {
        tenant: tenantResponse.data,
        authorization: authorizationResponse.data,
        login: { email, pwd },
      };
    } catch (error) {
      const { status, data } = error.response;
      if (status === 400) {
        setFormError(ELoginFormValidation.INCORRECT_LOGIN);
      } else {
        setFormError(ELoginFormValidation.UNEXPECTED_ERROR);
      }
      return thunkAPI.rejectWithValue(data);
    }
  }
);

export const reAuthorizeThunk = createAsyncThunk(
  'auth/reauthorize',
  async (
    {
      email,
      pwd,
    }: {
      email: string;
      pwd: string;
    },
    thunkAPI
  ) => {
    try {
      const loginResponse = await loginPOST(email, pwd);
      return loginResponse;
    } catch (err) {
      const { data } = err.response;
      return thunkAPI.rejectWithValue(data);
    }
  }
);
