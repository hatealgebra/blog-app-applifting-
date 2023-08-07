import React from "react";
import LoadingCircles from "./Loading";
import ProgressBar from "./ProgressBar";

export const LoadingIcons = () => (
  <div style={{ display: "flex", gap: "30px" }}>
    <ProgressBar />
    <LoadingCircles />
  </div>
);

export default {
  title: "Atoms/Loading icons",
  subcomponent: { ProgressBar },
};
