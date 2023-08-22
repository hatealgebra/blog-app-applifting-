/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { Components } from '../../customTypes/declarations';
import type { RootState } from '..';
import { getArticlesFeedThunk } from '../thunks/articles.thunk';
import { createArticleThunk, deleteArticleThunk } from '../thunks/admin.thunks';
import { ESortByOptions } from './slices.types.d';

const initialState = {
  status: 'idle',
  data: {},
  error: false,
} as {
  status: 'idle' | 'loading';
  error: boolean;
  data: {
    originalSort: Components['schemas']['ArticleList'];
    nowSort: Components['schemas']['ArticleList'];
    articleToEdit: Components['schemas']['ArticleDetail'];
  };
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    sortMyArticles: (state, { payload }: { payload: ESortByOptions }) => {
      if (payload === ESortByOptions.ORIGINAL) {
        state.data.nowSort = state.data.originalSort;
      } else {
        state.data.nowSort.items = [...state.data.originalSort.items!].sort(
          (a, b) => {
            if (a[payload] > b[payload]) {
              return 1;
            }
            if (a[payload] < b[payload]) {
              return -1;
            }
            return 0;
          }
        );
      }
    },
    setArticleToEdit: (state, { payload }) => {
      console.log('payload', payload);
      state.data.articleToEdit = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getArticlesFeedThunk.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getArticlesFeedThunk.fulfilled, (state, { payload }) => {
      state.status = 'idle';
      state.data.originalSort = payload;
      state.data.nowSort = payload;
    });
    builder.addCase(getArticlesFeedThunk.rejected, (state) => {
      state.error = true;
      state.status = 'idle';
      state.data = initialState.data;
    });

    builder.addCase(createArticleThunk.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(createArticleThunk.fulfilled, (state, { payload }) => {
      state.data.originalSort?.items?.push(payload);
      state.status = 'idle';
    });
    builder.addCase(createArticleThunk.rejected, (state) => {
      state.status = 'idle';
    });

    builder.addCase(deleteArticleThunk.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(deleteArticleThunk.fulfilled, (state, { payload }) => {
      state.data.originalSort.items = payload;
      state.status = 'idle';
    });
    builder.addCase(deleteArticleThunk.rejected, (state) => {
      state.status = 'idle';
    });
  },
});

// ACTIONS
export const { sortMyArticles, setArticleToEdit } = adminSlice.actions;
// SELECTORS
export const selectMyArticlesOriginalItems = (state: RootState) =>
  state.reducer?.admin.data.originalSort?.items;
export const selectMyArticlesItems = (state: RootState) =>
  state.reducer?.admin.data.nowSort?.items ?? [];
export const selectMyArticlesStatus = (state: RootState) =>
  state.reducer?.admin.status;
export const selectMyArticlesError = (state: RootState) =>
  state.reducer?.admin.error;
export const selectArticleToEdit = (state: RootState) =>
  state.reducer?.admin.data.articleToEdit;

export default adminSlice.reducer;
