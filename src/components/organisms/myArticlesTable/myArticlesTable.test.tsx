import React from 'react';

import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import { setupTestWithStore } from '../../../utils/testing.utils';
import MyArticlesTable from './MyArticlesTable';

// FIXME: fix Tests that will shows the fetched articles

describe('My articles checbox testing', () => {
  let checkboxes: HTMLElement[];
  beforeEach(async () => {
    const { getAllByRole } = setupTestWithStore(<MyArticlesTable />);
    checkboxes = getAllByRole('checkbox');
    userEvent.click(checkboxes[0]);
  });
  test('check all', async () => {
    await waitFor(() => {
      checkboxes.map((checkbox) => expect(checkbox).toBeChecked);
    });
    screen.debug();
  });
  test('uncheck all', async () => {
    userEvent.click(checkboxes[0]);
    await waitFor(() => {
      checkboxes.map((checkbox) => expect(checkbox).not.toBeChecked);
    });
  });
});

// describe("my articles sorting check", () => {
//   let articleRows: HTMLElement[];
//   beforeAll(async () => {
//     const { findAllByTestId } = setupTestWithStore(<MyArticlesTable />);
//     articleRows = await findAllByTestId("edit-article-row");
//   });
//   test("sorting by article title", async () => {
//     const sortBtnTitle = screen.getByRole("button", { name: "Article title" });
//     userEvent.click(sortBtnTitle);
//     await waitFor(() => {
//       expect(articleRows[0]).toHaveValue(
//         "Do Cats Drink Water? Cat Hydration & Dehydration Prevention"
//       );
//     });
//   });
// });
