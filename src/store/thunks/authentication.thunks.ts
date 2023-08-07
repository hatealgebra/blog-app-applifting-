import { createAsyncThunk } from "@reduxjs/toolkit";
import { Axios, AxiosRequestConfig } from "axios";
import { navigate } from "gatsby";
import { ELoginFormValidation } from "../../components/organisms/forms/LoginForm";
import { loginPOST } from "../../services/authServices";
import { USER_CONFIG } from "../../services/services.config";
import { getTenant } from "../../services/tenantServices";
import { ADMIN_LINKS } from "../../utils/contants";

export const postLoginThunk = createAsyncThunk(
  "auth/login",
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
      navigate(ADMIN_LINKS.MY_ARTICLES);
      return {
        tenant: tenantResponse.data,
        authorization: authorizationResponse.data,
        login: { email, pwd },
      };
    } catch (error) {
      console.log(error);
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
  "auth/reauthorize",
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
