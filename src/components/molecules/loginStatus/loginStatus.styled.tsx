import styled from 'styled-components';

export const AvatarButtonStyled = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

export const LoginStatuMenuStyled = styled.ul<{ isOpen: boolean }>`
  position: absolute;
  left: 0;
  right: 0;
  z-index: 5;
  width: 150px;
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  flex-direction: column;
  padding: 5px 0;
  margin: 0;
  box-shadow: ${({ theme }) => theme.shadow.search_shadow};
  margin-top: 5px;
  border-radius: 2px;
  background-color: white;

  a {
    display: inline-flex;
    align-items: center;
    gap: 15px;
    color: ${({ theme }) => theme.color.black};
    padding: 10px;

    &:hover {
      text-decoration: none;
      background-color: ${({ theme }) => theme.color.mono200};
      transition: 0.4s ease-in;
    }
  }
`;

export const LoginStatusContainerStyled = styled.div`
  min-height: fit-content;
  width: fit-content;
`;
