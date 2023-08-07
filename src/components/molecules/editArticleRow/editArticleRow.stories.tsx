import React from "react";

import EditArticleRow from "./EditArticleRow";
import EditArticleRowButtons from "./EditArticleRowButtons";

import articlesMockJSON from "../../../__mocks__/asyncData/get/allArticlesResponse.mock.json";
import { action } from "@storybook/addon-actions";

const { title, perex, comments } = articlesMockJSON.items[0];

export const ArticleRowExample = () => {
  const editArticleMock = () => action("Edit function called");
  const callDeleteMock = () => action("Delete article right");
  const setCheckedBoxes = () => action("All boxes were checked");

  return (
    <EditArticleRow
      iteration={0}
      title={title}
      perex={perex}
      comments={comments}
      editArticle={editArticleMock}
      deleteArticle={callDeleteMock}
      isChecked={true}
      setCheckedBoxes={setCheckedBoxes}
    />
  );
};

export const ArticleRowButtonsExample = () => {
  return (
    <EditArticleRowButtons
      setCheckAll={action("setCheckAll called!")}
      dispatchSort={action("Dispatch sort called!")}
      dispatchEdit={action("Dispatch edit called")}
      dispatchDelete={action("Dispatch delete called!")}
      dispatchReset={action("Dispatch reset called!")}
    />
  );
};

export default {
  title: "Molecules/Edit article",
  component: EditArticleRow,
};
