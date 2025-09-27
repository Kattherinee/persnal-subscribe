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
  email: string;
  fullname: string;
}

export interface AuthResponse {
  access_token: string;
  email: string;
  fullname: string;
}
