import React from 'react';
import Discussion from './Discussion';

import allArticlesMockJSON from '../../../__mocks__/asyncData/get/articlesDetailsResponse.mock.json';
import { Provider } from 'react-redux';
import mockStore from '../../../__mocks__/store.mock';

export const DiscussionExample = () => {
  const comments = allArticlesMockJSON.items[4].comments;
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
