import React from 'react';

import { createArticle } from '../../../services/articlesOperations';
import PublishArticleForm from './PublishArticleForm';

const lorem =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum optio nesciunt at asperiores cumque quis, enim, ratione repellendus aliquam perferendis nihil atque facere adipisci nulla neque vel beatae eaque eos. lorem onsectetur adipisicing elit. Voluptatum optio nesciunt at asperiores cumque quis, enim, ratione repellendus aliquam perferendis nihil atque facere adipisci nulla neque vel beatae eaqu';

export const CreateNewArticleFormExample = () => {
  return (
    <PublishArticleForm
      onSubmit={createArticle}
      titleValue="Article title"
      markdownContentValue={lorem}
    />
  );
};
// export const EditArticleFormExample = () => (
//   <PublishArticleForm
//     markdownContentValue={lorem}
//     title="Mock article title"
//     imageFileValue={britishCat}
//     onSubmit={createArticleSubmit}
//   />
// );

export default {
  title: 'Organisms/Forms',
  component: PublishArticleForm,
};
