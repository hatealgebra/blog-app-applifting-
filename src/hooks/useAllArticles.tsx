import { useStaticQuery, graphql } from 'gatsby';
import { useEffect, useState } from 'react';

const useAllArticles = () => {
  const [articles, setArticles] = useState([]);

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

  useEffect(() => {
    setArticles(allArticles.allPosts.nodes);
  }, []);

  return articles;
};

export default useAllArticles;
