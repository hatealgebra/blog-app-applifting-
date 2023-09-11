import { GatsbySSR } from 'gatsby';
import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './src/components/particles/GlobalStyle';
import Theme from './src/components/particles/Theme';
import store from './src/store';

export const wrapRootElement: GatsbySSR['wrapRootElement'] = ({ element }) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={Theme}>
        <GlobalStyle />
        {element}
      </ThemeProvider>
    </Provider>
  );
};
