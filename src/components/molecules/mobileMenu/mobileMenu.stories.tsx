import { action } from "@storybook/addon-actions";
import { ComponentMeta } from "@storybook/react";
import React from "react";
import MobileMenu from "./MobileMenu";

export const MobileMenuExample = () => (
  <MobileMenu isOpen={true} setClose={() => action("Mobile menu closed")} />
);

export default {
  title: "Molecules/Mobile Menu",
  component: MobileMenu,
} as ComponentMeta<typeof MobileMenu>;
