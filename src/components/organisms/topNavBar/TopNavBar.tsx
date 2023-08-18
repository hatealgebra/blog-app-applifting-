import React from 'react';

import catLogo from '../../../images/cat-logo.svg';
import MenuButton from '../../atoms/button/MenuButton';
import MobileMenu from '../../molecules/mobileMenu/MobileMenu';
import StyledLink from '../../atoms/links/link.styled';
import { NavLinks } from '../../../utils/contants';
import LoginLink from '../../atoms/links/LoginLink';
import LoginStatus from '../../molecules/loginStatus/LoginStatus';
import { selectAuthLogged } from '../../../store/slices/auth.slices';
import { useAppSelector } from '../../../store/hooks';
import { TopNavBarProps } from './topNavBar.types';
import StyledTopNav, { StyledTopNavLinks } from './topNavBar.styled';

const { INDEX, ABOUT } = NavLinks;

const TopNavBar = ({ variant }: TopNavBarProps) => {
  const [isMenuOpen, setMenuOpen] = React.useState(false);
  const isLoggedIn = useAppSelector(selectAuthLogged);

  return (
    <StyledTopNav variant={variant} className="TopNavbar">
      <div className="TopNavbar__container">
        {variant === 'mobile' ? (
          <>
            <CatLogo />
            <MenuButton onClick={() => setMenuOpen(true)} />
            <MobileMenu
              isOpen={isMenuOpen}
              setClose={() => setMenuOpen(false)}
            />
          </>
        ) : variant === 'tablet' ? (
          <>
            <CatLogo />
            <div className="TopNavbar__sub-container">
              <TopNavBarLinks />
              <LoginLinkSwitch isLoggedIn={isLoggedIn} />
            </div>
          </>
        ) : (
          <>
            <div className="TopNavbar__sub-container">
              <CatLogo /> <TopNavBarLinks />
            </div>
            <div className="TopNavbar__sub-container">
              <LoginLinkSwitch isLoggedIn={isLoggedIn} />
            </div>
          </>
        )}
      </div>
    </StyledTopNav>
  );
};

const CatLogo = () => <img src={catLogo} alt="cat logo" height="40px" />;
const TopNavBarLinks = () => (
  <StyledTopNavLinks>
    <StyledLink variant="classic" to={INDEX}>
      Recent Articles
    </StyledLink>
    <StyledLink variant="classic" to={ABOUT}>
      About
    </StyledLink>
  </StyledTopNavLinks>
);

const LoginLinkSwitch = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  return isLoggedIn ? <LoginStatus /> : <LoginLink />;
};

export default TopNavBar;
