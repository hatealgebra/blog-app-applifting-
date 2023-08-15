import React from 'react';
import PublishArticleForm from '../../components/organisms/publishArticleForm/PublishArticleForm';
import PageTemplate from '../../components/templates/Page.template';

const CreateNewArticlePage = () => {
  return (
    <PageTemplate isProtected>
      <PublishArticleForm />
    </PageTemplate>
  );
};

export default CreateNewArticlePage;
