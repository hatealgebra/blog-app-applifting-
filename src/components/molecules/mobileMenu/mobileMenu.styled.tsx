import styled from 'styled-components';

const MobileMenuContainer = styled.div<{ isOpen: boolean }>`
  overflow: hidden;
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: ${({ isOpen }) => (isOpen ? '100%' : 0)};
  background-color: ${({ theme }) => theme.color.mono};
  transition: 0.2s ease-in;

  .mobile-menu {
    &__help-div {
      display: flex;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-content: center;
      padding: 5%;
      text-align: center;
      height: 100%;
      width: 100%;
    }
  }
  .login-link {
    margin: 0 auto 10px auto;
  }
`;

export const MobileMenuNav = styled.nav`
  padding: 150px 2% 20px 4%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: center;
`;

export const MobileMenuCloseButton = styled.button`
  position: absolute;
  background-color: transparent;
  border: none;
  right: 3%;
  top: 3%;
  cursor: pointer;
`;

export default MobileMenuContainer;
