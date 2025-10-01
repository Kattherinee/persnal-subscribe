import type { ITariff } from '../dto/tariffs';
import { createAuthenticatedRequest } from './baseRequest';

export const getAvailableTariff = async () => {
  const request = createAuthenticatedRequest();
  const response = await request.get<ITariff[]>('/Tariff/GetAvailableTariff');
  return response.data;
};
