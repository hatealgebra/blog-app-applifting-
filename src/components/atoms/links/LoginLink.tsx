import React from 'react';

import { HiOutlineArrowLeft } from '@react-icons/all-files/hi/HiOutlineArrowLeft';

import { StyledLoginLink } from './link.styled';
import { NavLinks } from '../../../utils/contants';

const LoginLink = () => {
  const { LOGIN } = NavLinks;
  return (
    <StyledLoginLink to={LOGIN} className="login-link">
      <span>Login</span>
      <HiOutlineArrowLeft style={{ transform: 'rotate(180deg)' }} />
    </StyledLoginLink>
  );
};

export default LoginLink;
