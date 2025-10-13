import { createAuthenticatedAdminRequest } from './baseRequest';

export const getUserInfo = async () => {
  const request = createAuthenticatedAdminRequest();
  const response = await request.get('/AdminUser/GetUserInfo');
  return response.data;
};
