import axios from 'axios';

import { API_KEY, BASE_API_URL } from './services.config';

export const getTenant = async (tenantId: string) => {
  try {
    return await axios({
      method: 'get',
      url: `${BASE_API_URL}/tenants/${tenantId}`,
      headers: { 'x-api-key': API_KEY },
    });
  } catch (e) {
    throw e;
  }
};
