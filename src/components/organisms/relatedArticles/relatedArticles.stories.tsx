import React from "react";
import RelatedArticles from "./RelatedArticles";
import relatedArticlesJSON from "../../../__mocks__/asyncData/get/allArticlesResponse.mock.json";

export const RelatedArticlesSection = () => (
  <RelatedArticles articles={relatedArticlesJSON.items} />
);

export default {
  title: "Organisms/Related Articles section",
  component: RelatedArticles,
};
