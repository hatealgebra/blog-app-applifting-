import { appLiftingAxiosProtected } from './services.config';

const getTenant = async (tenantId: string) => {
  return appLiftingAxiosProtected.get(`/tenants/${tenantId}`);
};

export default getTenant;
