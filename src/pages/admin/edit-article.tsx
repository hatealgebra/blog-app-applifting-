import React from 'react';

import PublishArticleForm from '@organisms/publishArticleForm/PublishArticleForm';
import PageTemplate from '@templates/Page.template';
import { selectArticleToEdit } from '@store/slices/admin.slices';
import { useAppSelector } from '@store/hooks';

const EditArticlePage = () => {
  const article = useAppSelector(selectArticleToEdit);

  console.log(article);

  return (
    <PageTemplate isProtected>
      <PublishArticleForm
        titleValue={article?.title}
        imageFileValue={article?.imageData}
        markdownContentValue={article?.content}
      />
    </PageTemplate>
  );
};

export default EditArticlePage;
