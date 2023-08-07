import React from "react";

import CreateNewArticlePage from "./create-article";
import EditArticlePage from "./edit-article";

import MyArticlesPage from "./my-articles";
import { Story } from "@storybook/react";
import { Provider } from "react-redux";
import mockStore from "../../__mocks__/store.mock";

export const MyArticles = () => <MyArticlesPage />;
export const CreateNewArticle = () => <CreateNewArticlePage />;
export const EditArticle = () => <EditArticlePage />;

export default {
  title: "Pages/Admin pages",
  subcomponent: { MyArticlesPage, CreateNewArticlePage },
  decorators: [
    (Story: Story) => (
      <Provider store={mockStore}>
        <Story />
      </Provider>
    ),
  ],
};
