import path from 'path';
import { getArticle, listArticles } from './src/services/articlesOperations';
import { showImage } from './src/services/imagesServices';
import webpack from 'webpack';
import dotenv from 'dotenv';

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

const POST_NODE_TYPE = 'posts';

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    plugins: [
      new webpack.ProvidePlugin({
        // Make a global `process` variable that points to the `process` package,
        // because the `util` package expects there to be a global variable named `process`.
        // Thanks to https://stackoverflow.com/a/65018686/14239942
        process: 'process/browser',
      }),
    ],
    resolve: {
      fallback: {
        os: 'os-browserify/browser',
        path: 'path-browserify',
        crypto: false,
        stream: false,
      },
    },
  });
};

exports.sourceNodes = async ({
  actions: { createNode },
  createContentDigest,
  createNodeId,
}) => {
  try {
    const result = await listArticles();
    const { items: articles } = result.data;

    const completeArticleData = await Promise.all(
      articles.map(async (article) => {
        const { imageId, articleId } = article;
        // fetches the image
        const { data } = await showImage(imageId);
        const imageData = Buffer.from(data, 'binary').toString('base64');
        // fetches the additional details like comment and content
        const { data: articleDetailData } = await getArticle(articleId);
        return {
          ...articleDetailData,
          comments: JSON.stringify(articleDetailData.comments),
          imageBase64: imageData,
        };
      })
    );

    completeArticleData.forEach(async (article, index) => {
      const { articleId } = article;
      createNode({
        ...article,
        id: createNodeId(`${POST_NODE_TYPE}-${articleId}`),
        children: [],
        parent: null,
        internal: {
          type: POST_NODE_TYPE,
          content: JSON.stringify(article),
          contentDigest: createContentDigest(article),
        },
      });
    });
  } catch (e) {
    console.error('Error while creating nodes', e);
  }
};

exports.createPages = async ({ actions: { createPage }, graphql }) => {
  // list all of the articles that are published

  const articles = await graphql(`
    query {
      allPosts {
        nodes {
          id
          articleId
          createdAt
          lastUpdatedAt
          imageId
          imageBase64
          title
          perex
          content
          comments
        }
      }
    }
  `);

  // Create a page with recent articles feed
  createPage({
    component: path.resolve('./src/pages/index.tsx'),
    path: `/`,
    context: { articles },
  });
  console.log('graphql resolution', articles);
  //  Create page for each article
  articles.data.allPosts.nodes.forEach((article) => {
    const url = `/articles/${article.articleId}`;
    console.log(url, 'article url');
    createPage({
      context: { url, article },
      path: url,
      component: path.resolve(
        './src/components/templates/ArticlePage.template.tsx'
      ),
    });
  });
};

// // constants for your GraphQL Post and Author types

// if (process.env.NODE_ENV === 'development') {
//   server.listen();
// }
