import allArticlesMockJSON from '@mocks/asyncData/get/allArticlesResponse.mock.json';
import allArticlesDetailMockJSON from '@mocks/asyncData/get/articlesDetailsResponse.mock.json';
import imageResponseMockJSON from '@mocks/asyncData/post/postImageResponse.mock.json';

import { expect } from '@jest/globals';
import {
  createArticle,
  deleteArticle,
  getArticle,
  listArticles,
  updateArticle,
} from './articlesOperations';
import { deleteImage, showImage, uploadImage } from './imagesServices';
import {
  API_BASE_URL,
  appLiftingAxios,
  appliftingAxiosProtected,
} from './services.config';

const mockTitle = 'Random title';
const mockPerex = 'Random perex';
const mockImageId = 'Random imageId';
const mockContent =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies ultricies, nunc nisl ultricies nunc, quis a';

const mockObject = {
  title: mockTitle,
  perex: mockPerex,
  imageId: mockImageId,
  content: mockContent,
};

// eslint-disable-next-line @typescript-eslint/naming-convention
const access_token = 'access_token';

describe('Axios instances', () => {
  test('applifting axios instance', async () => {
    const response = await appLiftingAxios.get('/articles');
    expect(response.config.baseURL).toBe(API_BASE_URL);
  });
  test('applifting axios protected instance', async () => {
    const response = await appliftingAxiosProtected.get('/articles');
    expect(response.headers['x-api-key']).toBe(process.env.X_API_KEY);
  });
});

describe('Article operations', () => {
  test('listArticles', async () => {
    const response = await listArticles();
    const { data } = response;
    expect(data).toStrictEqual(allArticlesMockJSON);
  });

  test('createArticle', async () => {
    const response = await createArticle(
      mockTitle,
      mockPerex,
      mockImageId,
      mockContent,
      access_token
    );
    const { data } = response;
    expect(data).toStrictEqual({
      ...mockObject,
      createdAt: '2023-08-24T19:39:59.977638',
      lastUpdatedAt: '2023-08-24T19:39:59.977638',
      comments: [],
    });
  });

  test('delete article', async () => {
    const response = await deleteArticle('articleId', access_token);
    expect(response.status).toBe(204);
  });

  test('update article', async () => {
    const response = await updateArticle('articleId', access_token, mockObject);
    const { data } = response;

    expect(data).toStrictEqual({
      ...mockObject,
      createdAt: '2023-08-24T19:39:59.977638',
      lastUpdatedAt: '2023-08-25T19:39:59.977638',
      comments: [],
    });
  });

  test('getArticle response', async () => {
    const response = await getArticle(
      allArticlesDetailMockJSON.items[0].articleId
    );

    expect(response.data).toStrictEqual(allArticlesDetailMockJSON.items[0]);
  });
});

// TODO: Finish all tests
describe('Image services', () => {
  test('uploadImage', async () => {
    const formData = new FormData();
    const response = await uploadImage(formData, 'access_token');

    expect(response.data).toStrictEqual(imageResponseMockJSON);
  });
  // TODO: Show image test
  test('showImage', async () => {
    const response = await showImage('1231312-31232141-1312');
    expect(response.status).toBe(200);
  });
  test('deleteImage', async () => {
    const response = await deleteImage('imageId', access_token);
    expect(response.status).toBe(204);
  });
});
