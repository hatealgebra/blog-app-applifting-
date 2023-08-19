import axios from 'axios';

// PWD Applifting123
export const BASE_API_URL = 'https://fullstack.exercise.applifting.cz';
export const API_KEY = '719b7164-ccbf-49a1-a33e-c9056e22805e';

export enum UserConfig {
  TENANT_ID = '1e5cfa30-c38b-44c5-87ae-558f7dee6146',
  CREATED_AT = '2022-10-18T16:12:22.6780557Z',
  LAST_USED_AT = '',
  NAME = 'contact@pavel-vondra.com',
}

export const appLiftingAxios = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    'X-API-KEY': API_KEY,
  },
});

export const appLiftingAxiosProtected = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    'X-API-KEY': API_KEY,
  },
});
