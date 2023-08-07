import React from "react";
import styled from "styled-components";
import { TopNavBarProps } from "./TopNavBar";

const StyledTopNav = styled.header<TopNavBarProps>`
  position: fixed;
  display: flex;
  top: 0;
  z-index: 98;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.color.mono};
  padding: ${({ variant }) =>
    variant === "mobile"
      ? "15px"
      : variant === "tablet"
      ? "15px 5%"
      : "15px 5%"};
  height: 48px;

  .TopNavbar {
    &__container {
      display: flex;
      width: 100%;
      margin: 0 auto;
      justify-content: space-between;
      align-items: center;
      max-width: 1000px;
    }
    &__sub-container {
      position: relative;
      top: 0px;
      display: flex;
      gap: 20px;
      align-content: flex-start;
      align-items: center;
    }
  }
`;

export const StyledTopNavLinks = styled.nav`
  display: flex;
  gap: 20px;
`;

export default StyledTopNav;
