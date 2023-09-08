import axios from 'axios';
import 'dotenv/config';

const getTenant = async (tenantId: string) => {
  return axios({
    method: 'get',
    url: `${process.env.API_BASE_URL}/tenants/${tenantId}`,
    headers: { 'x-api-key': process.env.X_API_KEY },
  });
};

export default getTenant;
