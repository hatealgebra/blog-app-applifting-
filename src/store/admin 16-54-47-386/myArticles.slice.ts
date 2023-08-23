/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { Components } from '@customTypes/declarations';
import { ESortByOptions } from '@store/slices/slices.types.d';
import type { RootState } from '..';
import { getMyArticles } from '../thunks/articles.thunk';

const initialState = {
  status: 'idle',
  data: { nowSort: { items: undefined } },
  error: false,
} as {
  status: 'idle' | 'loading';
  error: boolean;
  data: {
    originalSort: Components['schemas']['ArticleList'];
    nowSort: Components['schemas']['ArticleList'];
  };
};

export const myArticlesSlice = createSlice({
  name: 'myArticles',
  initialState,
  reducers: {
    sortMyArticles: (state, { payload }) => {
      if (payload === ESortByOptions.ORIGINAL) {
        state.data.nowSort = state.data.originalSort;
      } else {
        state.data.nowSort.items = [
          ...state.data.originalSort.items.sort((a, b) => {
            if (a[payload] > b[payload]) {
              return 1;
            }
            if (a[payload] < b[payload]) {
              return -1;
            }
            return 0;
          }),
        ];
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMyArticles.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getMyArticles.fulfilled, (state, { payload }) => {
      state.status = 'idle';
      state.data.originalSort = payload;
      state.data.nowSort = payload;
    });
    builder.addCase(getMyArticles.rejected, (state) => {
      state.error = true;
      state.status = 'idle';
      state.data = initialState.data;
    });
  },
});

export const selectMyArticlesItems = (state: RootState) =>
  state.myArticles.data.nowSort.items;
export const selectMyArticlesStatus = (state: RootState) =>
  state.myArticles.status;
export const selectMyArticlesError = (state: RootState) =>
  state.myArticles.error;

export default myArticlesSlice.reducer;
