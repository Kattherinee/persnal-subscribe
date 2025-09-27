export interface UserRegisterParams {
  email: string;
  fullName: string;
  password: string;
}

export interface UserLoginParams {
  login: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  fullname: string;
}

export interface AuthResponse {
  access_token: string;
  id: string;
  email: string;
  fullname: string;
}
export interface UserUpdateParams {
  id: string;
  email: string;
  fullname: string;
}

export interface PasswordUpdateParams {
  id: string;
  newPassword: string;
}
