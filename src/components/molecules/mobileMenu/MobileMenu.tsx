import React from 'react';
import { GrClose } from '@react-icons/all-files/gr/GrClose';
import MobileMenuContainer, {
  MobileMenuCloseButton,
  MobileMenuNav,
} from './mobileMenu.styled';

import { AdminLinks } from '../../../utils/contants';
import { MobileMenuLink } from '../../atoms/links/link.styled';
import LoginLink from '../../atoms/links/LoginLink';

const MobileMenu = ({ isOpen, setClose }: MobileMenuProps) => {
  return (
    <MobileMenuContainer
      isOpen={isOpen}
      className="mobile-menu"
      data-testid="mobileMenu"
    >
      <div className="mobile-menu__help-div">
        <MobileMenuCloseButton
          onClick={setClose}
          data-testid="close-mobile-menu"
        >
          <GrClose size="20px" width={10} />
        </MobileMenuCloseButton>
        <MobileMenuNav>
          <MobileMenuLink to={AdminLinks.MY_ARTICLES}>
            Recent articles
          </MobileMenuLink>
          <MobileMenuLink to={AdminLinks.MY_ARTICLES}>About</MobileMenuLink>
        </MobileMenuNav>
        <LoginLink />
      </div>
    </MobileMenuContainer>
  );
};

export interface MobileMenuProps {
  isOpen: boolean;
  setClose: () => void;
}

export default MobileMenu;
