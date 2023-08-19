/* eslint-disable no-param-reassign */
import { Store } from '@reduxjs/toolkit';
import { AxiosRequestConfig } from 'axios';
import { reAuthorizeThunk } from '../store/thunks/authentication.thunks';
import { appLiftingAxiosProtected } from './services.config';

const setUpInterceptor = (store: Store) => {
  const handleRequest = async (config: AxiosRequestConfig) => {
    const { dispatch, getState } = store;
    const { login, authorization } = getState().persistedReducer.data;
    const { email, pwd } = login;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { access_token } = authorization;
    if (!config.headers!.Authorization && !access_token) {
      const reauthenticationResponse = await dispatch(
        reAuthorizeThunk({ email, pwd })
      );

      const refreshedToken = await reauthenticationResponse.payload.data
        .access_token;
      config.headers = config.headers ?? {};
      config.headers.Authorization = refreshedToken;
    } else {
      config.headers = config.headers ?? {};
      config.headers.Authorization = authorization.access_token;
    }
    return config;
  };

  appLiftingAxiosProtected.interceptors.request.use(
    async (config) => {
      return handleRequest(config);
    },

    (error) => {
      Promise.reject(error);
    }
  );

  appLiftingAxiosProtected.interceptors.response.use(
    async (response) => response,
    async (error) => {
      const { response } = error;
      const { status } = response;
      const { dispatch, getState } = store;
      const { login } = getState().persistedReducer.data;
      const { email, pwd } = login;
      if (status === 403) {
        try {
          return dispatch(reAuthorizeThunk({ email, pwd }));
        } catch (e) {
          return e;
        }
      }
      return '_';
    }
  );
};

export default setUpInterceptor;
