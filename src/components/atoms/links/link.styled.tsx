import React from 'react';

import { Link as GatsbyLink } from 'gatsby';
import styled from 'styled-components';
import StyledButton from '../button/button.styled';

export const ButtonLink = styled(StyledButton).attrs<{
  colortheme: 'primary' | 'secondary';
  to: string;
}>(() => ({
  as: GatsbyLink,
}))<{ colortheme: 'primary' | 'secondary'; to: string }>`
  text-decoration: none;
`;

const StyledLink = styled(GatsbyLink)<{ variant?: 'classic' | 'text' }>`
  color: ${({ variant }) => (variant === 'classic' ? 'black' : 'auto')};
  text-decoration: none;
  font-weight: 400;
  &:hover {
    text-decoration: underline;
  }
`;

export const MobileMenuLink = styled(StyledLink)`
  font-size: ${({ theme }) => theme.typography.size.h3};
  text-transform: capitalize;
  color: black;
`;

export const StyledLoginLink = styled(GatsbyLink)`
  display: inline-flex;
  align-items: center;
  gap: 3px;
  color: ${({ theme }) => theme.color.primary};
  text-decoration: none;
  svg {
    transition: 1s ease-out;
    position: relative;
    left: 0px;
  }

  &:hover {
    svg {
      left: 8px;
    }
  }
`;

export default StyledLink;
