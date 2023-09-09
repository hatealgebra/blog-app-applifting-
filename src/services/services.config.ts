import axios from 'axios';

export const API_BASE_URL = 'https://fullstack.exercise.applifting.cz';

export enum UserConfig {
  TENANT_ID = '1e5cfa30-c38b-44c5-87ae-558f7dee6146',
  CREATED_AT = '2022-10-18T16:12:22.6780557Z',
  LAST_USED_AT = '',
}

export const appLiftingAxios = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'X-API-KEY': process.env.X_API_KEY,
  },
});
