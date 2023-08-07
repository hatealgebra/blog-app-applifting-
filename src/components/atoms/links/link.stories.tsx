import React from "react";
import { useAppSelector } from "../../../store/hooks";
import { selectAuthToken } from "../../../store/slices/auth.slices";
import { clearDataAPI } from "../../../utils/generic.utils";
import Link from "./link.styled";
import LoginLink from "./LoginLink";

export const AllVariants = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
    <Link to="/#">Classic link</Link>
    <Link variant="text" to="/#">
      Text link
    </Link>
    <LoginLink />
  </div>
);

export default {
  component: Link,
  subcomponent: { LoginLink },
  title: "Atoms/Link",
};
