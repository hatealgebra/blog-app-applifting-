import { navigate } from 'gatsby';
import React from 'react';
import useWindowSize from '../../hooks/useWindowSize';
import { useAppSelector } from '../../store/hooks';
import { selectAuthToken } from '../../store/slices/auth.slices';
import { BREAKPOINTS } from '../../utils/contants';
import TopNavBar from '../organisms/topNavBar/TopNavBar';
import { NonFormPageContainer, StyledPageTemplate } from './templates.styled';

const PageTemplate = ({
  children,
  isArticle,
  isProtected,
}: PageTemplateProps) => {
  const { width } = useWindowSize();
  const { MOBILE, LAPTOP } = BREAKPOINTS;
  const auth = useAppSelector(selectAuthToken);

  React.useEffect(() => {
    if (isProtected && !auth) {
      navigate('/');
    }
  }, []);

  return (
    <StyledPageTemplate>
      <TopNavBar
        variant={
          width >= LAPTOP ? 'desktop' : width >= MOBILE ? 'tablet' : 'mobile'
        }
      />
      <NonFormPageContainer isArticle={isArticle}>
        {children}
      </NonFormPageContainer>
    </StyledPageTemplate>
  );
};

interface PageTemplateProps {
  children: React.ReactNode;
  isArticle?: boolean;
  isProtected?: boolean;
}

export default PageTemplate;
