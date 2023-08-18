import { clear } from 'console';
import { action } from '@storybook/addon-actions';
import React from 'react';
import { Provider } from 'react-redux';
import store from '../../../store';
import mockStore from '../../../__mocks__/store.mock';
import CreateComment from './CreateComment';

export const CreateCommentDisabled = () => {
  localStorage.clear();
  return (
    <Provider store={store}>
      <CreateComment dispatch={() => action('Comment was created!')} />
    </Provider>
  );
};

export const CreateCommmentAuthorized = () => (
  <Provider store={mockStore}>
    <CreateComment dispatch={() => action('Comment was created!')} />
  </Provider>
);

export default {
  title: 'Molecules/Create comment',
  component: CreateComment,
};
