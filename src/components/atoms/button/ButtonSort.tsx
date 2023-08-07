import React, { Dispatch } from "react";

import { StyledButtonSort } from "./button.styled";

import { FaSort } from "@react-icons/all-files/fa/FaSort";

const ButtonSort = ({
  isActive,
  children,
  onClick,
  className,
}: ButtonSortProps) => {
  return (
    <StyledButtonSort
      className={className}
      isActive={isActive}
      onClick={onClick}
    >
      <span>{children}</span>
      <FaSort />
    </StyledButtonSort>
  );
};

interface ButtonSortProps {
  isActive?: boolean;
  children: string;
  onClick: () => void;
  className?: string;
}

export default ButtonSort;
