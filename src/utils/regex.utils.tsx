export const emailValidation = (emailToValidate: string) => {
  const regExEmail = /^\S+@\S+\.\S+$/;
  return regExEmail.test(emailToValidate);
};
export const pwdValidation = (password: string) => {
  const regExPwd = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g;
  return regExPwd.test(password);
};
