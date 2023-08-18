import React from 'react';
import Button from '../../atoms/button/Button';
import { ButtonLink } from '../../atoms/links/link.styled';
import { StyledMyArticlesHeading } from './adminHeading.styled';

const AdminHeading = ({
  heading,
  to,
  buttonText,
  isFormPage,
}: AdminHeadingProps) => {
  return (
    <StyledMyArticlesHeading>
      <h1>{heading}</h1>
      {to && (
        <ButtonLink colortheme="primary" to={to}>
          {buttonText}
        </ButtonLink>
      )}
      {isFormPage && <Button type="submit">{buttonText}</Button>}
    </StyledMyArticlesHeading>
  );
};

interface AdminHeadingProps {
  heading: string;
  buttonText: string;
  to?: string;
  isFormPage?: boolean;
}

export default AdminHeading;
