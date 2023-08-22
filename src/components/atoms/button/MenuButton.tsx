import React from 'react';

import { CgMenu } from '@react-icons/all-files/cg/CgMenu';
import { MenuButtonProps } from './button.types';
import { MenuButtonContainer } from './button.styled';

const MenuButton = ({ onClick }: MenuButtonProps) => {
  return (
    <MenuButtonContainer onClick={onClick} data-testid="hamburger-menu">
      <CgMenu size="20px" />
    </MenuButtonContainer>
  );
};

export default MenuButton;
