import axios from 'axios';
import type { IPasswordUpdateParams, IUserRegisterParams, IUserUpdateParams } from '../dto/user';
import { API_URL } from './constants';
import { createAuthenticateUserRequest } from './baseRequest';

const request = createAuthenticateUserRequest();

export const registerUser = async (data: IUserRegisterParams) => {
  const response = await axios.post(`${API_URL}/User/Register`, data);
  return response.data;
};

export const updateUser = async (data: IUserUpdateParams) => {
  const response = await request.put(`${API_URL}/User/Update`, data);
  return response.data;
};

export const updatePassword = async ({ newPassword }: IPasswordUpdateParams) => {
  const response = await request.put(`${API_URL}/User/UpdatePassword?newPassword=${newPassword}`);
  return response.data;
};

export const deleteUser = async () => {
  const response = await request.delete(`${API_URL}/User/DeleteUser`);
  return response.data;
};
