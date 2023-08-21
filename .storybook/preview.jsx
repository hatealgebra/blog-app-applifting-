import React from 'react';
import { action } from '@storybook/addon-actions';
import worker from "../src/__mocks__/browser";



import { ThemeProvider } from 'styled-components';
import { initialize, mswDecorator } from 'msw-storybook-addon';
import { Provider } from 'react-redux';
import mockStore from '../src/__mocks__/store.mock';


import themeDefault from '../src/components/particles/Theme';
import GlobalStyle from '../src/components/particles/GlobalStyle';
import AxiosInterceptor from '../src/components/particles/AxiosInterceptor';
import { addDecorator } from '@storybook/react';

// Gatsby's Link overrides:
// Gatsby Link calls the `enqueue` & `hovering` methods on the global variable ___loader.
// This global object isn't set in storybook context, requiring you to override it to empty functions (no-op),
// so Gatsby Link doesn't throw errors.
global.___loader = {
  enqueue: () => {},
  hovering: () => {},
};
// This global variable prevents the "__BASE_PATH__ is not defined" error inside Storybook.
global.__BASE_PATH__ = '/';

// Navigating through a gatsby app using gatsby-link or any other gatsby component will use the `___navigate` method.
// In Storybook, it makes more sense to log an action than doing an actual navigate. Check out the actions addon docs for more info: https://storybook.js.org/docs/react/essentials/actions

window.___navigate = (pathname) => {
  action('NavigateTo:')(pathname);
};


initialize();
// decorators
// FIXME: Does not work with themesProvider
const storybookWrapper = (Story) => (
  <Provider store={mockStore}>
    <ThemeProvider theme={themeDefault}>
      <AxiosInterceptor store={mockStore}>
        <GlobalStyle />
        <Story />
      </AxiosInterceptor>
    </ThemeProvider>
  </Provider>
);

addDecorator(mswDecorator);
addDecorator(storybookWrapper);
const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

if (typeof global.process === 'undefined') {
  console.log(worker);
  worker.start();
}

export default preview;
