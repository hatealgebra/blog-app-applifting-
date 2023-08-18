require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

import type { GatsbyConfig } from 'gatsby';
import { API_KEY, BASE_API_URL } from './src/services/services.config';

const config: GatsbyConfig = {
  flags: {
    DEV_SSR: true,
  },
  siteMetadata: {
    title: `blog-app`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-plugin-sitemap',
    'gatsby-transformer-remark',
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,

    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images/`,
      },
      __key: 'images',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/src/pages/`,
      },
      __key: 'pages',
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        // Footnotes mode (default: true)
        footnotes: true,
        // GitHub Flavored Markdown mode (default: true)
        gfm: true,
        // Gatsby flavor plugins configs
        plugins: [],
        // Remark plugins
        remarkPlugins: [],
        // Rehype plugins
        rehypePlugins: [],
      },
    },
    {
      resolve: `gatsby-plugin-tsconfig-paths`,
      options: {
        configFile: `${__dirname}/tsconfig.json`,
        silent: true,
      },
    },
    {
      resolve: 'gatsby-source-apiserver',
      options: {
        url: `${BASE_API_URL}/articles`,
        method: 'get',
        headers: { 'X-API-KEY': API_KEY },
        name: 'paginationAPI',
        entityLevel: 'pagination',
      },
    },
  ],
};

export default config;
