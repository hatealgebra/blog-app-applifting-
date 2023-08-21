import axios from 'axios';
import { API_KEY, BASE_API_URL } from './services.config';

const loginPOST = async (username: string, password: string) => {
  const response = await axios({
    method: 'post',
    url: `${BASE_API_URL}/login`,
    data: {
      username,
      password,
    },
    headers: { 'X-API-KEY': API_KEY },
  });
  return response;
};

export default loginPOST;
