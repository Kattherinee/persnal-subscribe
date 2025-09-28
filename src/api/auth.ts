import axios from 'axios';
import type {
  AuthResponse,
  PasswordUpdateParams,
  UserLoginParams,
  UserRegisterParams,
  UserUpdateParams,
} from '../dto/user';

const API_URL = 'http://212.74.231.109:8181'; // замени на твой backend

// Авторизация
export const loginUser = async (data: UserLoginParams) => {
  const response = await axios.post<AuthResponse>(`${API_URL}/Auth/Login`, data);
  return response.data;
};

// Регистрация
export const registerUser = async (data: UserRegisterParams) => {
  const response = await axios.post(`${API_URL}/User/Register`, data);
  return response.data;
};

export const updateUser = async (data: UserUpdateParams) => {
  const response = await axios.put(`${API_URL}/User/Update`, data);
  return response.data;
};

export const updatePassword = async ({ userId, newPassword }: PasswordUpdateParams) => {
  const response = await axios.put(
    `${API_URL}/User/UpdatePassword?userId=${userId}&newPassword=${newPassword}`,
  );
  return response.data;
};

export const deleteUser = async (userId: string) => {
  const response = await axios.delete(`${API_URL}/User/DeleteUser?userId=${userId}`);
  return response.data;
};
