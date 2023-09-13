import { appliftingAxiosProtected } from './services.config';

const loginPOST = async (username: string, password: string) => {
  const data = {
    username,
    password,
  };
  const response = await appliftingAxiosProtected.post('/login', data);
  return response;
};

export default loginPOST;
