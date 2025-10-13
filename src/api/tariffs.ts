import type { IMyTariff, ITariff } from '../dto/tariffs';
import { createAuthenticateUserRequest } from './baseRequest';

export const getAvailableTariff = async () => {
  const request = createAuthenticateUserRequest();
  const response = await request.get<ITariff[]>('/Tariff/GetAvailableTariff');
  return response.data;
};

export const payTariff = async (tariffId: string) => {
  const request = createAuthenticateUserRequest();
  const response = await request.get<string>(`/Tariff/PayTariff?tariffId=${tariffId}`);
  return response.data;
};

export const getUserTariffs = async () => {
  const request = createAuthenticateUserRequest();
  const response = await request.get<IMyTariff[]>('/Tariff/GetUserTariff');
  return response.data;
};

export const getTariffDetail = async (tariffId: string) => {
  const request = createAuthenticateUserRequest();
  const response = await request.get(`/Tariff/GetTariffDetail?tariffId=${tariffId}`);
  return response.data;
};
