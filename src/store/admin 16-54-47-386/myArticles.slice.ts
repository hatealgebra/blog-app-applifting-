import { createSlice } from "@reduxjs/toolkit";
import { Console } from "console";
import { ESortByOptions } from "../../components/molecules/editArticleRow/EditArticleRowButtons";

import { components } from "../../types";
import type { RootState } from "..";
import { getMyArticles } from "../thunks/articles.thunk";

const initialState = {
  status: "idle",
  data: { nowSort: { items: undefined } },
  error: false,
} as {
  status: "idle" | "loading";
  error: boolean;
  data: {
    originalSort: components["schemas"]["ArticleList"];
    nowSort: components["schemas"]["ArticleList"];
  };
};

export const myArticlesSlice = createSlice({
  name: "myArticles",
  initialState,
  reducers: {
    // sortMyArticles: (state, { payload }) => {
    //   if (payload === ESortByOptions.ORIGINAL) {
    //     state.data.nowSort = state.data.originalSort;
    //   // } else {
    //   //   state.data.nowSort.items = [...state.data.originalSort.items.sort(
    //   //     (a, b) => {
    //   //       if (a[payload] > b[payload]) {
    //   //         return 1;
    //   //       } else if (a[payload] < b[payload]) {
    //   //         return -1;
    //   //       } else {
    //   //         return 0;
    //   //       }
    //   //     }
    //   //   )
    //   // }
    // }
  },
  extraReducers: (builder) => {
    builder.addCase(getMyArticles.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getMyArticles.fulfilled, (state, { payload }) => {
      state.status = "idle";
      state.data.originalSort = payload;
      state.data.nowSort = payload;
    });
    builder.addCase(getMyArticles.rejected, (state, { payload }) => {
      state.error = true;
      state.status = "idle";
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
