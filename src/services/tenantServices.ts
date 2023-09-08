import axios from 'axios';

const { API_BASE_URL, X_API_KEY } = process.env;

const getTenant = async (tenantId: string) => {
  return axios({
    method: 'get',
    url: `${API_BASE_URL}/tenants/${tenantId}`,
    headers: { 'x-api-key': X_API_KEY },
  });
};

export default getTenant;
