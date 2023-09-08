import { useStaticQuery, graphql } from 'gatsby';

// ADD pagination

const useAllArticles = () => {
  const allArticles = useStaticQuery(graphql`
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

  return allArticles.allPosts.nodes ?? [];
};

export default useAllArticles;
