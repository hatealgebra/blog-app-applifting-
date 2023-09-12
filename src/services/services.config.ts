import axios from 'axios';

export const API_BASE_URL = 'https://fullstack.exercise.applifting.cz';

export const UserConfig = {
  TENANT_ID: process.env.TENANT_ID,
  CREATED_AT: '2022-10-18T16:12:22.6780557Z',
  LAST_USED_AT: '',
};

export const appLiftingAxios = axios.create({
  baseURL: API_BASE_URL,
});

export const appliftingAxiosProtected = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'X-API-KEY': process.env.X_API_KEY,
  },
});
