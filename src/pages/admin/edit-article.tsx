import React from 'react';

import { Components } from '@customTypes/declarations';
import { showImage } from '@services/imagesServices';
import PublishArticleForm from '@organisms/publishArticleForm/PublishArticleForm';
import PageTemplate from '@templates/Page.template';
import { selectArticleToEdit } from '@store/slices/admin.slices';
import { useAppSelector } from '@store/hooks';

const EditArticlePage = () => {
  const [articleData, setArticleData] = React.useState<
    (Components['schemas']['ArticleDetail'] & { imageData: any }) | null
  >(null);
  const article = useAppSelector(selectArticleToEdit);

  const setData = async (
    articleToSet: Components['schemas']['ArticleDetail']
  ) => {
    const { data } = await showImage(articleToSet?.imageId!);
    return setArticleData({
      ...articleToSet,
      imageData: data,
    });
  };

  React.useEffect(() => {
    setData(article);
  }, [article]);

  return (
    <PageTemplate isProtected>
      <PublishArticleForm
        titleValue={articleData?.title}
        imageFileValue={articleData?.imageData}
        markdownContentValue={articleData?.content}
      />
    </PageTemplate>
  );
};

export default EditArticlePage;
