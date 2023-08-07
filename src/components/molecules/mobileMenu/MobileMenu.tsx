import React from "react";
import MobileMenuContainer, {
  MobileMenuCloseButton,
  MobileMenuNav,
} from "./mobileMenu.styled";
import { GrClose } from "@react-icons/all-files/gr/GrClose";

import { navLinks } from "../../../utils/contants";
import StyledLink, { MobileMenuLink } from "../../atoms/links/link.styled";
import LoginLink from "../../atoms/links/LoginLink";

const MobileMenu = ({ isOpen, setClose }: MobileMenuProps) => {
  return (
    <MobileMenuContainer
      isOpen={isOpen}
      className="mobile-menu"
      data-testid="mobileMenu"
    >
      <div className="mobile-menu__help-div">
        <MobileMenuCloseButton onClick={setClose}>
          <GrClose size="20px" width={10} />
        </MobileMenuCloseButton>
        <MobileMenuNav>
          <MobileMenuLink to={navLinks.MY_ARTICLES}>
            Recent articles
          </MobileMenuLink>
          <MobileMenuLink to={navLinks.MY_ARTICLES}>About</MobileMenuLink>
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
