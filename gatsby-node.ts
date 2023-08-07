import path from 'path';
import { getArticle, listArticles } from './src/services/articlesOperations';
import { showImage } from './src/services/imagesServices';

const POST_NODE_TYPE = `Posts`;

exports.sourceNodes = async ({
  actions: { createNode },
  createContentDigest,
  createNodeId,
  getNodes,
}) => {
  console.log('Files yo:');
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
    console.log(e);
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
    path: `/`,
    component: path.resolve('./src/pages/index.tsx'),
    context: { articles },
  });

  //  Create page for each article
  articles.data.allPosts.nodes.forEach((article) => {
    const url = `/articles/${article.articleId}`;
    createPage({
      path: url,
      component: path.resolve(
        './src/components/templates/ArticlePage.template.tsx'
      ),
      context: { url, article },
    });
  });
};

// // constants for your GraphQL Post and Author types

// if (process.env.NODE_ENV === "development") {
//   const { server } = require("./src/__mocks__/server");
//   server.listen();
// }
