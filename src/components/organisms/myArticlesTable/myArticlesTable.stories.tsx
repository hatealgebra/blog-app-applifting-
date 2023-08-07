import React from "react";
import { rest } from "msw";
import MyArticlesTable from "./MyArticlesTable";
import { BASE_API_URL } from "../../../services/services.config";

export const MyArticlesTableExample = () => <MyArticlesTable />;
// TODO: Add specific msw mocking for these stories, to show different
// export const MyArticleTableLoading = () => <MyArticlesTable />;
// export const NoArticles = () => <MyArticlesTable />;
// NoArticles.parameters = {
//   msw: {
//     handlers: [
//       rest.get(`${BASE_API_URL}/articles`, (req, res, ctx) => {
//         return res(ctx.status(200), ctx.json([]));
//       }),
//     ],
//   },
// };

export default {
  title: "Organisms/My Articles",
  component: MyArticlesTable,
};
