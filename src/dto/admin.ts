export interface IAdminLoginParams {
  login: string;
  password: string;
}

export interface IAdminAuthResponse {
  access_token: string;
  role: string;
}
export interface IAdmin {
  access_token: string;
  role: string;
}

export interface IUserDto {
  id: string;
  fullName: string;
  email: string;
  tariffTitle?: string;
  tariffEndDate?: string;
}
