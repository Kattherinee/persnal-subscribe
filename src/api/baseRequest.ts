import axios from 'axios';
import { API_URL } from './constants';
import { useAuthStore } from '../store/authStore';
import { useAdminStore } from '../store/adminStore';

export const createAuthenticateUserRequest = () => {
  const token = useAuthStore.getState().token;

  return axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: token }),
    },
  });
};

export const createAuthenticatedAdminRequest = () => {
  const token = useAdminStore.getState().admin?.access_token;

  return axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: token }),
    },
  });
};
