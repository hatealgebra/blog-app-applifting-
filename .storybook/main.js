const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-actions',
    '@storybook/addon-storyshots',
    '@storybook/addon-interactions',
    'msw-storybook-addon',
  ],
  framework: '@storybook/react',
  core: {
    builder: 'webpack5',
    options: {
      fsCache: true,
    },
  },
  features: {
    interactionsDebugger: true, // 👈 Enable playback controls
  },
  staticDirs: ['../static'],
  webpackFinal: async (config) => {
    console.log(config);
    // Transpile Gatsby module because Gatsby includes un-transpiled ES6 code.
    config.module.rules[0].exclude = [
      /node_modules\/(?!(gatsby|gatsby-script)\/)/,
    ];

    // // Use correct react-dom depending on React version.
    // if (parseInt(React.version) <= 18) {
    //   config.externals = ['react-dom/client'];
    // }

    // Remove core-js to prevent issues with Storybook
    config.module.rules[0].exclude = [/core-js/];
    // Use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
    config.module.rules[0].use[0].options.plugins.push([
      require.resolve('babel-plugin-remove-graphql-queries'),
      {
        stage: config.mode === `development` ? 'develop-html' : 'build-html',
        staticQueryDir: './page-data/sq/d',
      },
    ]);

    config.module.rules.push({
      resolve: { fullySpecified: false },
    });
    config.resolve.mainFields = ['browser', 'module', 'main'];

    // Resolving tsconfig paths
    config.resolve.modules = [path.resolve(__dirname, '..'), 'node_modules'];

    config.resolve.alias = {
      ...config.resolve.alias,
      '@atoms': path.resolve(__dirname, '../src/components/atoms'),
      '@molecules': path.resolve(__dirname, '../src/components/molecules'),
      '@organisms': path.resolve(__dirname, '../src/components/organisms'),
      '@particles': path.resolve(__dirname, '../src/components/particles'),
      '@templates': path.resolve(__dirname, '../src/components/templates'),
      '@helpers': path.resolve(__dirname, '../src/helpers'),
      '@pages': path.resolve(__dirname, '../src/pages'),
      '@static': path.resolve(__dirname, '../src/static'),
      '@mocks': path.resolve(__dirname, '../src/__mocks__'),
      '@services': path.resolve(__dirname, '../src/services'),
      '@store': path.resolve(__dirname, '../src/store'),
      '@customTypes': path.resolve(__dirname, '../src/customTypes'),
      '@utils': path.resolve(__dirname, '../src/utils'),
      '@hooks': path.resolve(__dirname, '../src/hooks'),
    };

    return config;
  },

  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript-plugin',
    reactDocgenTypescriptOptions: {
      compilerOptions: {
        allowSyntheticDefaultImports: false,
        esModuleInterop: true,
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
