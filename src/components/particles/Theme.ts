import { BREAKPOINTS } from "../../utils/contants";

const { MOBILE, LANDSCAPE_TABLET, LAPTOP, DESKTOP } = BREAKPOINTS;

export default {
  name: "DEFAULT",
  fonts: {
    mainFont: `"Montserrat", sans-serif`,
  },
  // Base size 16px
  // Scale 1.200 - Major Third
  typography: {
    size: {
      h1: "2.6rem",
      h2: "2.2rem",
      h3: "1.8rem",
      h4: "1.44rem",
      h5: "1rem",
      body: "1rem",
      label: "0.833rem",
    },
    weight: {
      thin: 100,
      extra_light: 200,
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      black: 900,
    },
  },
  color: {
    primary: "#007BFF",
    secondary: "#6C757D",
    success: "#28A745",
    danger: "#DC3545",
    warning: "#FFC107",
    info: "#17A2B8",
    border: "#DFDFDF",
    mono: "#F8F9FA",
    mono200: "#DFDFDF",
    black: "#212529",
    text_muted: "#6C757D",
  },
  shadow: {
    form: "0px 16px 48px 0px #0000002D",
    search_shadow:
      "0 1px 3px 0 rgba(0, 0, 0, 0.1),0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    border_shadow: "0 0px 1px 0px rgba(0,0,0,.4)",
    big_shadow: "0px 5px 15px 3px rgba(0, 0, 0, .25)",
  },
  breakpoint: {
    mobile: `@media only screen and (max-width: ${MOBILE}px)`,
    tablet: `@media only screen and (min-width: ${MOBILE}px)`,
    landscapeTablet: `@media only screen and (min-width: ${LANDSCAPE_TABLET}px)`,
    laptop: `@media only screen and (min-width: ${LAPTOP}px)`,
    desktop: `@media only screen and (min-width: ${DESKTOP}px)`,
  },
};
