import React from "react";

import LoginForm from "./LoginForm";
import action from "@storybook/addon-actions";

export const LoginFormExample = () => <LoginForm />;

export default {
  title: "Organisms/Forms",
  subcomponent: { LoginForm },
};
