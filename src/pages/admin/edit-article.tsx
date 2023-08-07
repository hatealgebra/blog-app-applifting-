import React from "react";
import PublishArticleForm from "../../components/organisms/publishArticleForm/PublishArticleForm";
import PageTemplate from "../../components/templates/Page.template";
import { showImage } from "../../services/imagesServices";
import { useAppSelector } from "../../store/hooks";
import { selectArticleToEdit } from "../../store/slices/admin.slices";
import { components } from "../../types/declarations";

const EditArticlePage = () => {
  const [articleData, setArticleData] =
    React.useState<
      (components["schemas"]["ArticleDetail"] & { imageData: any }) | null
    >(null);
  const article = useAppSelector(selectArticleToEdit);

  const setData = async (article: components["schemas"]["ArticleDetail"]) => {
    const { data } = await showImage(article?.imageId!);
    return setArticleData({
      ...article,
      imageData: data,
    });
  };

  React.useEffect(() => {
    setData(article);
  }, []);

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
