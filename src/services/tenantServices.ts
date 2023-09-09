import { appLiftingAxios } from './services.config';

const getTenant = async (tenantId: string) => {
  return appLiftingAxios.get(`/tenants/${tenantId}`);
};

export default getTenant;
