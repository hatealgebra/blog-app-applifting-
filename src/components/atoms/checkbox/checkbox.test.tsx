import React from "react";
import userEvent from "@testing-library/user-event";
import { waitFor } from "@testing-library/react";

import { setupTest } from "../../../utils/testing.utils";
import Checkbox from "./Checkbox";

describe("checkbox interactivity", () => {
  test("checkbox is checked", async () => {
    const mockFn = jest.fn();
    const { getByRole } = setupTest(<Checkbox isChecked onChange={mockFn} />);
    userEvent.click(getByRole("checkbox"));
    await waitFor(() => {
      expect(mockFn).toHaveBeenCalled();
      expect(getByRole("checkbox")).toHaveAttribute("checked", "");
    });
  });
});
