import type { ITariff } from '../dto/tariffs';
import { createAuthenticateUserRequest } from './baseRequest';

export const getAvailableTariff = async () => {
  const request = createAuthenticateUserRequest();
  const response = await request.get<ITariff[]>('/Tariff/GetAvailableTariff');
  return response.data;
};
