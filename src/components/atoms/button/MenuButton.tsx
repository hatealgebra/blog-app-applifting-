import React from "react";

import { CgMenu } from "@react-icons/all-files/cg/CgMenu";
import { MenuButtonContainer } from "./button.styled";

const MenuButton = ({ onClick }: MenuButtonProps) => {
  return (
    <MenuButtonContainer onClick={onClick}>
      <CgMenu size="20px" />
    </MenuButtonContainer>
  );
};

export interface MenuButtonProps {
  onClick: () => void;
}

export default MenuButton;
