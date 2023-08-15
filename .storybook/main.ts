import { StorybookConfig } from '@storybook/react-webpack5';
import React from 'react';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    'storybook-addon-gatsby',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-actions',
    'storybook-addon-styled-component-theme/dist/preset',
    '@storybook/preset-create-react-app',
    '@storybook/addon-mdx-gfm',
  ],

  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },

  webpackFinal: async (config) => {
    // Transpile Gatsby module because Gatsby includes un-transpiled ES6 code.
    config.module.rules[2].exclude = [
      /node_modules\/(?!(gatsby|gatsby-script)\/)/,
    ];
    // Use correct react-dom depending on React version.
    if (parseInt(React.version) <= 18) {
      config.externals = ['react-dom/client'];
    }
    // Remove core-js to prevent issues with Storybook
    config.module.rules[2].exclude = [/core-js/];
    // Use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
    config.module.rules[2].use[0].options.plugins.push(
      require.resolve('babel-plugin-remove-graphql-queries')
    );
    config.resolve.mainFields = ['browser', 'module', 'main'];
    return config;
  },

  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      compilerOptions: {
        allowSyntheticDefaultImports: false,
        esModuleInterop: false,
      },
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },

  docs: {
    autodocs: 'tag',
  },
};

export default config;
