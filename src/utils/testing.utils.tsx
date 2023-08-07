import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";

import Theme from "../components/particles/Theme";
import GlobalStyle from "../components/particles/GlobalStyle";
import authReducer from "../store/slices/auth.slices";
import articleFeedReducer from "../store/slices/articleFeed.slice";
import mockStore from "../__mocks__/store.mock";

export const setupTest = (component: React.ReactElement | React.ReactNode) => {
  return render(
    <ThemeProvider theme={Theme}>
      <GlobalStyle /> {component}
    </ThemeProvider>
  );
};

export const setupTestWithStore = (component: React.ReactElement) => {
  const mockStore = configureStore({
    reducer: { auth: authReducer, articleFeed: articleFeedReducer },
    preloadedState: {},
  });

  return render(
    <Provider store={mockStore}>
      <ThemeProvider theme={Theme}>
        <GlobalStyle />
        {component}
      </ThemeProvider>
    </Provider>
  );
};
export const setupWithLoggedInUser = (component: React.ReactElement) => {
  return render(
    <Provider store={mockStore}>
      <ThemeProvider theme={Theme}>
        <GlobalStyle />
        {component}
      </ThemeProvider>
    </Provider>
  );
};
