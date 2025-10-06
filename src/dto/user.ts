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
  email: string;
  fullname: string;
}

export interface IUserAuthResponse {
  access_token: string;
  email: string;
  fullname: string;
}
export interface IUserUpdateParams {
  email: string;
  fullname: string;
}

export interface IPasswordUpdateParams {
  newPassword: string;
}
