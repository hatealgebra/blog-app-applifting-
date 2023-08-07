import React from "react";
import userEvent from "@testing-library/user-event";
import { setupTest } from "../../../utils/testing.utils";
import { screen, waitFor } from "@testing-library/react";

import { CommentExample } from "./comment.stories";

describe("comment rating", () => {
  test("vote up", async () => {
    const { getByRole, getByTestId } = setupTest(<CommentExample />);
    screen.debug();
    userEvent.click(getByRole("button", { name: "vote-up" }));
    await waitFor(() =>
      expect(getByTestId("reactionCounter")).toHaveTextContent("+1")
    );
  });
  test("vote down", async () => {
    const { getByRole, getByTestId } = setupTest(<CommentExample />);
    userEvent.click(getByRole("button", { name: "vote-down" }));
    await waitFor(() =>
      expect(getByTestId("reactionCounter")).toHaveTextContent("-1")
    );
  });
});
