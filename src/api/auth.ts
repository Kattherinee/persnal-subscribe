import axios from 'axios';
import type { AuthResponse, UserLoginParams, UserRegisterParams } from '../dto/user';

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
