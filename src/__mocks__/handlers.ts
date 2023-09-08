import { rest } from 'msw';
import 'dotenv/config';

import loginResponseJSON from './asyncData/post/login.mock.json';

import imageResponseJSON from './asyncData/post/postImageResponse.mock.json';
import articlesDetailResponseJSON from './asyncData/get/articlesDetailsResponse.mock.json';
import baseArticleDataResponseJSON from './asyncData/get/allArticlesResponse.mock.json';
import tenantMockJSON from './asyncData/get/tenantResponse.mock.json';
import imageBase64 from './base64.mock';

const { API_BASE_URL, X_API_KEY, NAME } = process.env;

const handlers = [
  /* POST handling */
  // Login
  rest.post(`${API_BASE_URL}/login`, async (req, res, ctx) => {
    const { username, password } = await req.json();
    if (username === NAME && password === 'MockPwd12345') {
      return res(ctx.status(200), ctx.json(loginResponseJSON));
    }
    return res(ctx.status(400), ctx.json({ error: 'Invalid credentials' }));
  }),
  // Publish article
  rest.post(`${API_BASE_URL}/articles`, async (req, res, ctx) => {
    const reqJSON = await req.json();
    delete reqJSON.access_token;

    const responseToReturn = {
      ...reqJSON,
      createdAt: '2023-08-24T19:39:59.977638',
      lastUpdatedAt: '2023-08-24T19:39:59.977638',
      comments: [],
    };

    return res(ctx.status(200), ctx.json(responseToReturn));
  }),
  // Upload image
  rest.post(`${API_BASE_URL}/images`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(imageResponseJSON));
  }),
  rest.post(`${API_BASE_URL}/comments`, async (req, res, ctx) => {
    const request = await req.json();
    const { articleId, author, content } = request;
    return res(
      ctx.status(200),
      ctx.json({
        articleId,
        author,
        content,
        postedAt: '2022-03-25T16:15:50.42655',
        score: 0,
      })
    );
  }),
  // TODO: Add vote up/down errors handling
  rest.post(`${API_BASE_URL}/comments/:commentId/vote/up`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.post(
    `${API_BASE_URL}/comments/:commentId/vote/down`,
    (req, res, ctx) => {
      return res(ctx.status(200));
    }
  ),

  /* GET handling */

  // List Articles
  // FIXME: Fix the reauthorize, the dispatch is called multiple
  rest.get(`${API_BASE_URL}/articles`, async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(baseArticleDataResponseJSON));
  }),
  // Article detail
  rest.get(`${API_BASE_URL}/articles/:articleId`, (req, res, ctx) => {
    const { articleId } = req.params;

    if (!articleId)
      return res(ctx.status(400), ctx.json({ error: 'Invalid articleId' }));

    const getArticle = articlesDetailResponseJSON.items.filter(
      (articleDetail) => articleDetail.articleId === articleId
    )[0];

    return res(
      ctx.set({
        'X-API-KEY': X_API_KEY,
        Authorization: loginResponseJSON.access_token,
      }),
      ctx.status(200),
      ctx.json(getArticle)
    );
  }),
  // Images
  rest.get(`${API_BASE_URL}/images/:imageId`, async (req, res, ctx) => {
    const imageBuffer = Buffer.from(imageBase64, 'base64');
    return res(
      ctx.status(200),
      ctx.set('responseType', 'arrayBuffer'),
      ctx.body(imageBuffer)
    );
  }),
  // Tenant
  rest.get(`${API_BASE_URL}/tenants/:tenantId`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(tenantMockJSON));
  }),

  /* DELETE */
  // Delete article
  rest.delete(`${API_BASE_URL}/articles/:articleId`, (req, res, ctx) => {
    return res(ctx.status(204));
  }),

  rest.delete(`${API_BASE_URL}/images/:imagesId`, (req, res, ctx) => {
    return res(ctx.status(204));
  }),

  /* PATCH */
  // Update article
  rest.patch(`${API_BASE_URL}/articles/:articleId`, async (req, res, ctx) => {
    const reqJSON = await req.json();
    return res(
      ctx.status(200),
      ctx.json({
        ...reqJSON,
        createdAt: '2023-08-24T19:39:59.977638',
        lastUpdatedAt: '2023-08-25T19:39:59.977638',
        comments: [],
      })
    );
  }),
];

export default handlers;
