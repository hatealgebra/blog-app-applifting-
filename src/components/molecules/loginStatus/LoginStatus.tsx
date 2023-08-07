import React from "react";
import { ADMIN_LINKS, navLinks } from "../../../utils/contants";
import Avatar from "../../atoms/avatar/Avatar";
import StyledLink from "../../atoms/links/link.styled";
import {
  AvatarButtonStyled,
  LoginStatuMenuStyled,
  LoginStatusContainerStyled,
} from "./loginStatus.styled";

import { RiLogoutBoxFill } from "@react-icons/all-files/ri/RiLogoutBoxFill";
import { RiAdminFill } from "@react-icons/all-files/ri/RiAdminFill";
import { useAppDispatch } from "../../../store/hooks";
import { logoutAction } from "../../../store/slices/auth.slices";
import useClickOutside from "../../../hooks/useClickOutside";

const LoginStatus = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  const ref = React.useRef(null);
  useClickOutside(ref, setIsOpen);

  const logOut = () => {
    dispatch(logoutAction);
  };

  return (
    <LoginStatusContainerStyled ref={ref}>
      <AvatarButtonStyled
        onClick={() => setIsOpen((prevState) => !prevState)}
        aria-label="avatar-button"
      >
        <Avatar size="md" />
      </AvatarButtonStyled>
      <LoginStatuMenuStyled
        aria-label="admin-menu"
        isOpen={isOpen}
        onClick={() => setIsOpen(false)}
      >
        <StyledLink to={ADMIN_LINKS.MY_ARTICLES}>
          <RiAdminFill />
          <span>My Articles</span>
        </StyledLink>
        <StyledLink onClick={logOut} to={navLinks.INDEX}>
          <RiLogoutBoxFill />
          <span>Log Out</span>
        </StyledLink>
      </LoginStatuMenuStyled>
    </LoginStatusContainerStyled>
  );
};

export default LoginStatus;
