export interface IUserRegisterParams {
  email: string;
  fullName: string;
  password: string;
}

export interface ILoginParams {
  login: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  fullname: string;
}

export interface IUserAuthResponse {
  access_token: string;
  id: string;
  email: string;
  fullname: string;
}
export interface IUserUpdateParams {
  id: string;
  email: string;
  fullname: string;
}

export interface IPasswordUpdateParams {
  userId: string;
  newPassword: string;
}
