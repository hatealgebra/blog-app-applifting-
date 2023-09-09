import { appLiftingAxiosProtected } from './services.config';

const loginPOST = async (username: string, password: string) => {
  const data = {
    username,
    password,
  };
  const response = await appLiftingAxiosProtected.post('/login', data);
  return response;
};

export default loginPOST;
