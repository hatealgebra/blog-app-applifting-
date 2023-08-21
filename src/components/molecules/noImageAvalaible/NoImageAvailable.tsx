import React from 'react';
import { BsImage } from '@react-icons/all-files/bs/BsImage';
import StyledNoImageContainer from './noImageAvailable.styled';

const NoImageAvailable = () => {
  return (
    <StyledNoImageContainer className="article-preview__img">
      <BsImage color="white" size="50%" />
    </StyledNoImageContainer>
  );
};

export default NoImageAvailable;
