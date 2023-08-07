import React from "react";
import MyArticlesTable from "../../components/organisms/myArticlesTable/MyArticlesTable";
import PageTemplate from "../../components/templates/Page.template";

const MyArticlesPage = () => {
  return (
    <PageTemplate isProtected>
      <MyArticlesTable />
    </PageTemplate>
  );
};

export default MyArticlesPage;
