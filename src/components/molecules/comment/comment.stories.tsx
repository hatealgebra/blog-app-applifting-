import React from 'react';
import Comment from './Comment';

const CommentTemplate = (args) => <Comment {...args} />;

export const CommentExample = () => (
  <Comment
    articleId="hello world"
    author="Linda Lynn"
    score={0}
    postedAt="2020-10-01T19:44:11.577668"
    content="
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus quibusdam
    qui autem libero consequuntur tenetur eveniet recusandae aliquam obcaecati.
    Consequatur perferendis id, dolorem quae unde recusandae ad deleniti
    obcaecati similique?
  "
  />
);

export default {
  title: 'Molecules/Comment',
  component: Comment,
};
