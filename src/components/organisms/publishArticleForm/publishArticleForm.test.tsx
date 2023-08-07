import React, { FormEvent } from "react";
import userEvent from "@testing-library/user-event";

import { setupTestWithStore } from "../../../utils/testing.utils";

import { screen, waitFor } from "@testing-library/react";
import PublishArticleForm from "./PublishArticleForm";
import { server } from "../../../__mocks__/server";

describe("Create new article suite", () => {
  global.URL.createObjectURL = jest.fn();
  let titleInput: HTMLElement;
  let imageFileInput: HTMLElement;
  let mdInput: HTMLElement;
  let submitBtn: HTMLElement;
  const mockFile = new File(["goodbye"], "goodbye.png", {
    type: "image/png",
  });

  beforeAll(() => {
    const { getByRole, getAllByRole, getByLabelText, getByTestId } =
      setupTestWithStore(<PublishArticleForm />);
    titleInput = getByLabelText("Article title");
    imageFileInput = getByTestId("image-uploader");
    mdInput = getAllByRole("textbox")[0];
    submitBtn = getByRole("button", { name: "Publish article" });
  });
  test("submit fuction was called", async () => {
    userEvent.type(titleInput, "Arrticle Tile");
    userEvent.upload(imageFileInput, mockFile);
    userEvent.type(
      mdInput,
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure mollitia eum culpa harum vero nulla beatae corporis a reprehenderit doloribus dignissimos nemo magnam, dolorem quisquam et? In laboriosam delectus consequatur. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure mollitia eum culpa harum vero nulla beatae corporis a reprehenderit doloribus dignissimos nemo magnam, dolorem quisquam et? In laboriosam delectus consequatur."
    );
    userEvent.click(submitBtn);
    await waitFor(() => {
      screen
        .getAllByRole("textbox")
        .map((input) => expect(input).toHaveValue(""));
    });
  });
});
