import React from "react";

import { ProgressBar as Progress } from "react-loader-spinner";
import Theme from "../../particles/Theme";

const ProgressBar = () => {
  return (
    <Progress borderColor={Theme.color.border} barColor={Theme.color.primary} />
  );
};

export default ProgressBar;
