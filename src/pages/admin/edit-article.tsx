import React from 'react';

import PublishArticleForm from '@organisms/publishArticleForm/PublishArticleForm';
import PageTemplate from '@templates/Page.template';
import { selectArticleToEdit } from '@store/slices/admin.slices';
import { useAppSelector } from '@store/hooks';

const EditArticlePage = () => {
  const article = useAppSelector(selectArticleToEdit);
  return (
    <PageTemplate isProtected>
      <PublishArticleForm
        articleId={article?.articleId}
        titleValue={article?.title}
        imageBase64={article?.imageBase64}
        markdownContentValue={article?.content}
      />
    </PageTemplate>
  );
};

export default EditArticlePage;
