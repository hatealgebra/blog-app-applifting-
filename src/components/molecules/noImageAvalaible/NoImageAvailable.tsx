import React from "react";
import { StyledNoImageContainer } from "./noImageAvailable.styled";

import { BsImage } from "@react-icons/all-files/bs/BsImage";

const NoImageAvailable = () => {
  return (
    <StyledNoImageContainer>
      <BsImage color="white" size="50%" />
    </StyledNoImageContainer>
  );
};

export default NoImageAvailable;
