import axios from 'axios';
import { API_URL } from './constants';
import { useAuthStore } from '../store/authStore';

export const createAuthenticatedRequest = () => {
  const token = useAuthStore.getState().token;

  return axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: token }),
    },
  });
};
