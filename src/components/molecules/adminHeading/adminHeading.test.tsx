import React from "react";
import { setupTest } from "../../../utils/testing.utils";
import AdminHeading from "./AdminHeading";

describe("Interactivity test", () => {
  const dest = "/create-article";
  test("Button calls what is supposed to", () => {
    const { getByRole } = setupTest(
      <AdminHeading
        heading="Heading pages"
        buttonText="Button text"
        to={dest}
      />
    );
    expect(getByRole("link")).toHaveAttribute("href", dest);
  });
});
