import React from 'react';
import PublishArticleForm from '../../components/organisms/publishArticleForm/PublishArticleForm';
import PageTemplate from '../../components/templates/Page.template';
import { showImage } from '../../services/imagesServices';
import { useAppSelector } from '../../store/hooks';
import { selectArticleToEdit } from '../../store/slices/admin.slices';
import { components } from '../../customTypes/declarations';

const EditArticlePage = () => {
  const [articleData, setArticleData] = React.useState<
    (components['schemas']['ArticleDetail'] & { imageData: any }) | null
  >(null);
  const article = useAppSelector(selectArticleToEdit);

  const setData = async (
    articleToSet: components['schemas']['ArticleDetail']
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
