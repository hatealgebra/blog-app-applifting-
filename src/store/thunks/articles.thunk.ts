import { createAsyncThunk } from '@reduxjs/toolkit';

import { getArticle, listArticles } from '../../services/articlesOperations';
import { Components } from '../../customTypes/declarations';

// Big O notation
export const getArticlesFeedThunk = createAsyncThunk(
  'articleFeed/getArticlesFeedThunk',
  async (_, thunkAPI) => {
    try {
      const articlesResponse = await listArticles();

      const { items } = articlesResponse.data;
      const newArticlesArray = await Promise.all(
        items.map(async (article: Components['schemas']['Article']) => {
          const { articleId } = article;
          const getArticleResponse = await getArticle(articleId!);
          const { comments, content } = getArticleResponse.data;
          return { ...article, comments, content };
        })
      );
      return { ...articlesResponse.data, items: newArticlesArray };
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const getArticleDetailThunk = createAsyncThunk(
  'articleFeed/getArticleDetailThunk',
  async (
    { articleId }: { articleId: string; access_token: string },
    thunkAPI
  ) => {
    try {
      const response = await getArticle(articleId);
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const getMyArticles = createAsyncThunk(
  'articleFeed/getArticlesFeedThunk',
  async (apiKey: string, thunkAPI) => {
    try {
      return 'hello';
      // const response = await getArticles(apiKey);
      // return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);
