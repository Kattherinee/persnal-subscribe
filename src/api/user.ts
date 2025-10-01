import axios from 'axios';
import type { IPasswordUpdateParams, IUserRegisterParams, IUserUpdateParams } from '../dto/user';
import { API_URL } from './constants';

export const registerUser = async (data: IUserRegisterParams) => {
  const response = await axios.post(`${API_URL}/User/Register`, data);
  return response.data;
};

export const updateUser = async (data: IUserUpdateParams) => {
  const response = await axios.put(`${API_URL}/User/Update`, data);
  return response.data;
};

export const updatePassword = async ({ userId, newPassword }: IPasswordUpdateParams) => {
  const response = await axios.put(
    `${API_URL}/User/UpdatePassword?userId=${userId}&newPassword=${newPassword}`,
  );
  return response.data;
};

export const deleteUser = async (userId: string) => {
  const response = await axios.delete(`${API_URL}/User/DeleteUser?userId=${userId}`);
  return response.data;
};
