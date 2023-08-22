import React from 'react';

import { FaSort } from '@react-icons/all-files/fa/FaSort';
import { StyledButtonSort } from './button.styled';

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
      data-testid="button-sort-title"
    >
      {children}
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
