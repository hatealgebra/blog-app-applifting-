import { rest } from 'msw';
import { API_KEY, BASE_API_URL, UserConfig } from '../services/services.config';

import loginResponseJSON from './asyncData/post/login.mock.json';
import createArticleResponseJSON from './asyncData/post/createArticleResponse.mock.json';
import imageResponseJSON from './asyncData/post/postImageResponse.mock.json';
import articlesResponseJSON from './asyncData/get/allArticlesResponse.mock.json';
import articlesDetailResponseJSON from './asyncData/get/articlesDetailsResponse.mock.json';
import tenantMockJSON from './asyncData/get/tenantResponse.mock.json';
import imageBase64 from './base64.mock';

const getArticleDetail = (articleId: string | readonly string[]) => {
  const articleDetailData = articlesDetailResponseJSON.find(
    (article) => article.articleId === articleId
  );
  return articleDetailData;
};

const handlers = [
  /* POST handling */
  // Login
  rest.post(`${BASE_API_URL}/login`, async (req, res, ctx) => {
    const { username, password } = await req.json();
    if (username === UserConfig.NAME && password === 'MockPwd12345') {
      return res(ctx.status(200), ctx.json(loginResponseJSON));
    }
    return res(ctx.status(400), ctx.json({ error: 'Invalid credentials' }));
  }),
  // Publish article
  rest.post(`${BASE_API_URL}/articles`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(createArticleResponseJSON));
  }),
  // Upload image
  rest.post(`${BASE_API_URL}/images`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(imageResponseJSON));
  }),
  rest.post(`${BASE_API_URL}/comments`, async (req, res, ctx) => {
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
  rest.post(`${BASE_API_URL}/comments/:commentId/vote/up`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.post(
    `${BASE_API_URL}/comments/:commentId/vote/down`,
    (req, res, ctx) => {
      return res(ctx.status(200));
    }
  ),

  /* GET handling */

  // List Articles
  // FIXME: Fix the reauthorize, the dispatch is called multiple
  rest.get(`${BASE_API_URL}/articles`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(articlesDetailResponseJSON));
  }),
  // Article detail
  rest.get(`${BASE_API_URL}/articles/:articleId`, (req, res, ctx) => {
    const { articleId } = req.params;
    const getArticle = articlesDetailResponseJSON.items.filter(
      ({ articleId: id }: { articleId: string }) => id === articleId
    )[0];
    return res(
      ctx.set({
        'X-API-KEY': API_KEY,
        Authorization: loginResponseJSON.access_token,
      }),
      ctx.status(200),
      ctx.json(getArticle)
    );
  }),
  // Images
  rest.get(`${BASE_API_URL}/images/:imageId`, async (req, res, ctx) => {
    const imageBuffer = Buffer.from(imageBase64, 'base64');
    return res(
      ctx.status(200),
      ctx.set('responseType', 'arrayBuffer'),
      ctx.body(imageBuffer)
    );
  }),
  // Tenant
  rest.get(`${BASE_API_URL}/tenants/:tenantId`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(tenantMockJSON));
  }),

  /* DELETE */
  // Delete article
  // rest.delete(`${BASE_API_URL}/articles/:articleId`, (req, res, ctx) => {
  //   const { articleId } = req.params;
  //   const getDeletedArticle = articlesResponseJSON.items.filter(
  //     ({ articleId: id }: { articleId: string }) => id === articleId
  //   )[0];
  //   return res(ctx.status(200), ctx.body(getDeletedArticle));
  // }),

  /* PATCH */
  // Update article
  rest.patch(`${BASE_API_URL}/articles/:articleId`, async (req, res, ctx) => {
    const { articleId } = await req.json();
    return res(ctx.status(200), ctx.json(getArticleDetail(articleId)));
  }),
];

export default handlers;
