import React from "react";

import userEvent from "@testing-library/user-event";

import { setupTest } from "../../../utils/testing.utils";

import { screen, waitFor } from "@testing-library/dom";
import UploadImage from "./UploadImage";
import { UploadImageExample } from "./uploadImage.stories";

global.URL.createObjectURL = jest.fn();
const originalFile = new File(["goodbye"], "goodbye.png", {
  type: "image/png",
});
const anotherFile = new File(["goodbye"], "goodbye.png", {
  type: "image/png",
});

describe("Interactivity of new upload", () => {
  const mockSetImage = jest.fn(() => originalFile);
  beforeEach(() => {
    const { getByTestId } = setupTest(
      <UploadImage image={null} setImage={mockSetImage} />
    );
    userEvent.upload(getByTestId("image-uploader"), originalFile);
  });
  test("dispatch called", async () => {
    await waitFor(() => {
      expect(mockSetImage).toHaveBeenCalled();
    });
  });
});

describe("Interactivity when file is already uploaded", () => {
  const mockSetImage = jest.fn();
  beforeEach(() => {
    setupTest(<UploadImage image={originalFile} setImage={mockSetImage} />);
  });

  test("dispatch call", async () => {
    const { getByTestId } = screen;
    userEvent.upload(getByTestId("image-uploader"), anotherFile);
    await waitFor(() => {
      expect(mockSetImage).toHaveBeenCalled();
    });
  });

  test("another image set", async () => {
    const { getByTestId, getByAltText } = screen;
    userEvent.upload(getByTestId("image-uploader"), anotherFile);
    await waitFor(() => {
      expect(getByAltText("goodbye.png")).toBeInTheDocument();
    });
  });
});
