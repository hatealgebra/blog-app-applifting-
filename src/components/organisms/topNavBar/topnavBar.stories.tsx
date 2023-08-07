import React from "react";
import TopNavBar from "./TopNavBar";

export const MobileNavBar = () => <TopNavBar variant="mobile" />;
export const TabletNavBar = () => <TopNavBar variant="tablet" />;
export const DesktopNavBar = () => <TopNavBar variant="desktop" />;

export default {
  title: "Organisms/Top NavBar",
  component: TopNavBar,
};
