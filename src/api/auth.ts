import axios from 'axios';
import type { IUserAuthResponse, ILoginParams } from '../dto/user';
import { API_URL } from './constants';
import type { IAdminAuthResponse, IAdminLoginParams } from '../dto/admin';

export const loginUser = async (data: ILoginParams) => {
  const response = await axios.post<IUserAuthResponse>(`${API_URL}/Auth/Login`, data);
  return response.data;
};

export const loginAdmin = async (data: IAdminLoginParams) => {
  const response = await axios.post<IAdminAuthResponse>(`${API_URL}/Auth/AdminLogin`, data);
  return response.data;
};
