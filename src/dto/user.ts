export interface UserRegisterParams {
  email: string;
  fullName: string;
  password: string;
}

export interface UserLoginParams {
  email: string;
  password: string;
}

export interface User {
  email: string;
  fullName: string;
  role: 'user';
}

export interface AuthResponse {
  token: string;
  user: User;
}
