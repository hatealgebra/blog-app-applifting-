import React from 'react';

import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';

import { setupTest } from '../../../utils/testing.utils';

import EditArticleRow from './EditArticleRow';

// TODO: JEST spyOn on functions inside the component

describe('Article Row interactivity', () => {
  const ediArticleFn = jest.fn();
  const deleteMockFn = jest.fn();
  const setCheckedBoxesMockFn = jest.fn();
  beforeEach(() =>
    setupTest(
      <EditArticleRow
        iteration={0}
        title="Article title"
        perex="Just a perex of the article"
        comments={5}
        editArticle={ediArticleFn}
        deleteArticle={deleteMockFn}
        isChecked={true}
        setCheckedBoxes={setCheckedBoxesMockFn}
      />
    )
  );
  test('checkbox click', async () => {
    const { getByRole } = screen;
    userEvent.click(getByRole('checkbox'));
    await waitFor(() => {
      expect(getByRole('checkbox')).toBeChecked();
    });
  });
  test('edit action', async () => {
    const { getAllByRole } = screen;
    userEvent.click(getAllByRole('button')[0]);
    await waitFor(() => {
      expect(ediArticleFn).toHaveBeenCalled();
    });
  });
  test('delete action', async () => {
    const { getAllByRole } = screen;
    userEvent.click(getAllByRole('button')[1]);
    await waitFor(() => {
      expect(deleteMockFn).toHaveBeenCalled();
    });
  });
});
