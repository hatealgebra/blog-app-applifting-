/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { Components } from '../../customTypes/declarations';
import type { RootState } from '..';

import {
  postLoginThunk,
  reAuthorizeThunk,
} from '../thunks/authentication.thunks';

export const authInitialState = {
  status: 'idle',
  data: {},
  error: false,
} as {
  status: 'idle' | 'loading';
  data: {
    tenant?: Components['schemas']['Tenant'] | null;
    authorization?: Components['schemas']['AccessToken'];
    login?: {
      email: string;
      pwd: string;
    };
  };
  error: boolean;
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    logout: (state) => {
      state.data = {};
    },
  },
  extraReducers: (builder) => {
    // login

    builder.addCase(postLoginThunk.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(postLoginThunk.fulfilled, (state, { payload }) => {
      state.status = 'idle';
      state.data = payload;
    });
    builder.addCase(postLoginThunk.rejected, (state) => {
      state.status = 'idle';
      state.error = true;
    });
    // reauthorize
    builder.addCase(reAuthorizeThunk.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(reAuthorizeThunk.fulfilled, (state, { payload }) => {
      state.status = 'idle';
      state.data.authorization = payload.data;
    });
    builder.addCase(reAuthorizeThunk.rejected, (state) => {
      state.status = 'idle';
      state.error = true;
    });
  },
});

export const { logout } = authSlice.actions;

export const logoutAction = { type: logout };

export const selectAuthName = (state: RootState) =>
  state.persistedReducer?.data.login?.email;
export const selectAuthTenant = (state: RootState) =>
  state.persistedReducer?.data.tenant;
export const selectAuthToken = (state: RootState) =>
  state.persistedReducer?.data.authorization?.access_token;
export const selectAuthStatus = (state: RootState) =>
  state.persistedReducer.status;
export const selectAuthError = (state: RootState) =>
  state.persistedReducer.error;
export const selectAuthLogged = (state: RootState) => {
  const authorization = state.persistedReducer?.data.authorization;
  const login = state.persistedReducer?.data.login;
  return !(
    !authorization ||
    Object.keys(authorization!).length === 0 ||
    !login
  );
};

export default authSlice.reducer;
