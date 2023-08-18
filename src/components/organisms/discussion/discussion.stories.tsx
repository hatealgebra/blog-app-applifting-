import React from 'react';
import { Provider } from 'react-redux';
import Discussion from './Discussion';

import allArticlesMockJSON from '../../../__mocks__/asyncData/get/articlesDetailsResponse.mock.json';
import mockStore from '../../../__mocks__/store.mock';

export const DiscussionExample = () => {
  const { comments } = allArticlesMockJSON.items[4];
  return (
    <Provider store={mockStore}>
      <Discussion
        articleId="234u1890rjf189hj891j4891j43"
        commentsArray={comments}
      />
    </Provider>
  );
};

export default {
  title: 'Organisms/Discussion',
  component: Discussion,
};
