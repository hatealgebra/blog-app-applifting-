import { createAsyncThunk } from '@reduxjs/toolkit';
import { navigate } from 'gatsby';
import {
  createArticle,
  deleteArticle,
} from '../../services/articlesOperations';
import { uploadImage } from '../../services/imagesServices';
import { Components } from '../../customTypes/declarations';
import { AdminLinks } from '../../utils/contants';

// todo finsih getMyArticleThunk
export const getMyArticlesThunk = createAsyncThunk(
  'admin/getMyArticlesThunk',
  async (_, thunkAPI) => {
    try {
      return 'hello';
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const createArticleThunk = createAsyncThunk(
  'admin/createArticleThunk',
  async (
    {
      title,
      perex,
      imageFormData,
      content,
      access_token,
    }: {
      title: string;
      perex: string;
      imageFormData: FormData;
      content: string;
      access_token: string;
    },
    thunkAPI
  ) => {
    try {
      const uploadImageResponse = await uploadImage(
        imageFormData,
        access_token
      );
      const response = await createArticle(
        title,
        perex,
        await uploadImageResponse!.data[0].imageId,
        content,
        access_token
      );
      navigate(AdminLinks.MY_ARTICLES);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const deleteArticleThunk = createAsyncThunk(
  'admin/deleteArticle',
  async (
    {
      articleId,
      originalArray,
      access_token,
    }: {
      articleId: string;
      originalArray: Components['schemas']['ArticleDetail'][];
      access_token: string | undefined;
    },
    thunkAPI
  ) => {
    try {
      deleteArticle(articleId, access_token!);
      const newOriginalArray = originalArray.filter(
        ({ articleId: id }) => id !== articleId
      );

      return newOriginalArray;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);
