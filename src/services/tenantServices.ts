import axios from 'axios';

import { API_KEY, BASE_API_URL } from './services.config';

const getTenant = async (tenantId: string) => {
  return axios({
    method: 'get',
    url: `${BASE_API_URL}/tenants/${tenantId}`,
    headers: { 'x-api-key': API_KEY },
  });
};

export default getTenant;
